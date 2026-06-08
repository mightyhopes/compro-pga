import os
from PIL import Image, ImageChops

def trim_white_borders(image, threshold=245):
    # Convert to grayscale to find non-white bounding box
    gray = image.convert('L')
    # Find bounding box of pixels that are darker than the threshold
    # Invert the grayscale image so white becomes black (0) and dark colors become bright (>0)
    inverted = gray.point(lambda p: 255 if p < threshold else 0)
    bbox = inverted.getbbox()
    if bbox:
        # Add a small padding (10 pixels) around the bbox
        w, h = image.size
        left = max(0, bbox[0] - 10)
        top = max(0, bbox[1] - 10)
        right = min(w, bbox[2] + 10)
        bottom = min(h, bbox[3] + 10)
        return image.crop((left, top, right, bottom))
    return image

def split_page_by_vertical_gaps(image_path, out_dir, page_num):
    print(f"Processing page {page_num}...")
    img = Image.open(image_path)
    w, h = img.size
    
    # Convert to grayscale to find vertical gaps
    gray = img.convert('L')
    
    # Calculate average pixel value for each row
    # A row is white if its average pixel value is very close to 255
    row_averages = []
    for y in range(h):
        row = [gray.getpixel((x, y)) for x in range(w)]
        row_averages.append(sum(row) / w)
    
    # Threshold for considering a row as "white gap"
    gap_threshold = 252.0
    
    # Identify non-gap segments
    segments = []
    in_segment = False
    start_y = 0
    
    # Minimum height of a segment to be considered valid (e.g., 50 pixels)
    min_segment_height = 80
    
    for y in range(h):
        is_white = row_averages[y] >= gap_threshold
        if not is_white:
            if not in_segment:
                start_y = y
                in_segment = True
        else:
            if in_segment:
                end_y = y
                if (end_y - start_y) >= min_segment_height:
                    segments.append((start_y, end_y))
                in_segment = False
                
    if in_segment:
        end_y = h
        if (end_y - start_y) >= min_segment_height:
            segments.append((start_y, end_y))
            
    # If no segments found, just trim the whole image
    if not segments:
        trimmed = trim_white_borders(img)
        trimmed.save(os.path.join(out_dir, f"page_{page_num}_trimmed.png"))
        print(f"Saved page_{page_num}_trimmed.png (No gaps found)")
        return
    
    # Crop and save each segment
    for idx, (start_y, end_y) in enumerate(segments):
        # Crop segment across full width
        segment_img = img.crop((0, start_y, w, end_y))
        # Trim white borders from the segment
        trimmed_segment = trim_white_borders(segment_img)
        
        # Don't save tiny elements (like headers, footers, page numbers)
        tw, th = trimmed_segment.size
        # Page numbers or simple headers are usually small in height (e.g., less than 60px)
        if th < 60 or tw < 60:
            print(f"  Skipped segment {idx+1} on page {page_num} because it is too small ({tw}x{th})")
            continue
            
        out_filename = f"page_{page_num}_part_{idx+1}.png"
        trimmed_segment.save(os.path.join(out_dir, out_filename))
        print(f"  Saved {out_filename} ({tw}x{th})")

def main():
    img_dir = r"d:\compro\image buku compro"
    out_dir = r"d:\compro\cropped_assets"
    os.makedirs(out_dir, exist_ok=True)
    
    for page_num in range(1, 20):
        img_path = os.path.join(img_dir, f"{page_num}.png")
        if os.path.exists(img_path):
            split_page_by_vertical_gaps(img_path, out_dir, page_num)
        else:
            print(f"File {img_path} does not exist.")

if __name__ == "__main__":
    main()
