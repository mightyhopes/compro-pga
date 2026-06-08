import shutil
import os

def setup():
    src_dir = r"d:\compro\cropped_assets"
    dest_dir = r"d:\compro\public\assets"
    
    if not os.path.exists(src_dir):
        print(f"Error: Source directory {src_dir} does not exist.")
        return
        
    try:
        shutil.copytree(src_dir, dest_dir, dirs_exist_ok=True)
        print(f"Successfully copied assets to {dest_dir}")
    except Exception as e:
        print(f"Error copying assets: {e}")

if __name__ == "__main__":
    setup()
