import os
import shutil
import re

def clean_filename(filename):
    # Remove special characters, convert spaces to underscores, lowercase
    name, ext = os.path.splitext(filename)
    cleaned = re.sub(r'[^a-zA-Z0-9\s_-]', '', name)
    cleaned = re.sub(r'[\s_-]+', '_', cleaned).strip('_').lower()
    return cleaned + ext.lower()

def copy_assets():
    base_src = r"d:\compro\ASSET COMPRO PGA"
    dest_dir = r"d:\compro\public\assets"
    
    # Create target directories
    os.makedirs(dest_dir, exist_ok=True)
    os.makedirs(os.path.join(dest_dir, "products"), exist_ok=True)
    os.makedirs(os.path.join(dest_dir, "certs"), exist_ok=True)
    os.makedirs(os.path.join(dest_dir, "factory"), exist_ok=True)
    os.makedirs(os.path.join(dest_dir, "details"), exist_ok=True)

    print("Copying main logo...")
    logo_src = os.path.join(base_src, "Logo PGA.png")
    if os.path.exists(logo_src):
        shutil.copy2(logo_src, os.path.join(dest_dir, "logo.png"))
        print("Logo copied as logo.png.")

    print("Copying core product images...")
    product_mappings = {
        "drawcord.jpeg": "products/drawcord.jpg",
        "drawcord with metal ending.jpeg": "products/drawcord_metal.jpg",
        "drawcord with clear plastic ending.jpeg": "products/drawcord_plastic.jpg",
        "elastic band.jpeg": "products/elastic_band.jpg",
        "elastic woven.jpeg": "products/elastic_woven.jpg"
    }

    for src_name, dest_name in product_mappings.items():
        src_path = os.path.join(base_src, src_name)
        if os.path.exists(src_path):
            shutil.copy2(src_path, os.path.join(dest_dir, dest_name))
            print(f"Copied product {src_name} -> {dest_name}")

    print("Copying certificate documents...")
    # GRS
    grs_dir = os.path.join(base_src, "SERTIFIKAT", "sc_cb-gss_GSS-GRS-20215940_20260127-GRS-Certificate-PT.-Perfect-Garment-Accessories")
    if os.path.exists(grs_dir):
        for i in range(1, 4):
            fn = f"sc_cb-gss_GSS-GRS-20215940_20260127 GRS Certificate PT. Perfect Garment Accessories_page-000{i}.jpg"
            src_file = os.path.join(grs_dir, fn)
            if os.path.exists(src_file):
                shutil.copy2(src_file, os.path.join(dest_dir, "certs", f"grs_page_{i}.jpg"))
                print(f"Copied GRS page {i}")

    # OEKO-TEX
    oeko_dir = os.path.join(base_src, "SERTIFIKAT", "26.HID.18587-Oekotex-Certificate-PT.-Perfect-Garment-Accessories")
    if os.path.exists(oeko_dir):
        fn = "26.HID.18587 Oekotex Certificate PT. Perfect Garment Accessories_page-0001.jpg"
        src_file = os.path.join(oeko_dir, fn)
        if os.path.exists(src_file):
            shutil.copy2(src_file, os.path.join(dest_dir, "certs", "oeko_page_1.jpg"))
            print("Copied OEKO-TEX page 1")

    # SLF
    slf_dir = os.path.join(base_src, "SERTIFIKAT", "SLF-PT.-PERFECT-GARMENT-ACCESSORIES-2025")
    if os.path.exists(slf_dir):
        for i in range(1, 4):
            fn = f"SLF PT. PERFECT GARMENT ACCESSORIES 2025_page-000{i}.jpg"
            src_file = os.path.join(slf_dir, fn)
            if os.path.exists(src_file):
                shutil.copy2(src_file, os.path.join(dest_dir, "certs", f"slf_page_{i}.jpg"))
                print(f"Copied SLF page {i}")

    # Process all other files in directory
    print("Processing other files...")
    all_files = os.listdir(base_src)
    
    factory_idx = 1
    detail_idx = 1
    whatsapp_idx = 1
    
    for f in all_files:
        src_path = os.path.join(base_src, f)
        if os.path.isdir(src_path):
            continue
            
        ext = os.path.splitext(f)[1].lower()
        if ext not in ['.jpg', '.jpeg', '.png']:
            continue
            
        # Skip already mapped core files to prevent duplicate copies
        if f in product_mappings or f == "Logo PGA.png":
            continue
            
        if f.startswith("IMG_"):
            dest_name = f"factory/factory_{factory_idx}{ext}"
            shutil.copy2(src_path, os.path.join(dest_dir, dest_name))
            print(f"Copied factory image {f} -> {dest_name}")
            factory_idx += 1
            
        elif f.startswith("ChatGPT Image"):
            dest_name = f"details/detail_{detail_idx}{ext}"
            shutil.copy2(src_path, os.path.join(dest_dir, dest_name))
            print(f"Copied detail image {f} -> {dest_name}")
            detail_idx += 1
            
        elif f.startswith("WhatsApp Image"):
            dest_name = f"products/whatsapp_{whatsapp_idx}{ext}"
            shutil.copy2(src_path, os.path.join(dest_dir, dest_name))
            print(f"Copied whatsapp image {f} -> {dest_name}")
            whatsapp_idx += 1

    print("==============================================")
    print("Asset copying process completed successfully!")
    print(f"Copied {factory_idx-1} factory images.")
    print(f"Copied {detail_idx-1} detail images.")
    print(f"Copied {whatsapp_idx-1} WhatsApp images.")
    print("==============================================")

if __name__ == "__main__":
    copy_assets()
