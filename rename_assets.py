import os
import shutil

def rename_and_restructure():
    src_dir = r"d:\compro\ASSET COMPRO PGA"
    dest_dir = r"d:\compro\public\assets"
    
    # Re-create folders
    os.makedirs(os.path.join(dest_dir, "products"), exist_ok=True)
    os.makedirs(os.path.join(dest_dir, "factory"), exist_ok=True)
    os.makedirs(os.path.join(dest_dir, "certs"), exist_ok=True)
    
    # 1. Main Logo
    shutil.copy2(os.path.join(src_dir, "Logo PGA.png"), os.path.join(dest_dir, "logo.png"))
    
    # 2. WeChat QR code (use page_19_part_2.png which was cropped in previous run, copy it to a nice name)
    cropped_qr = os.path.join(dest_dir, "page_19_part_2.png")
    if os.path.exists(cropped_qr):
        shutil.copy2(cropped_qr, os.path.join(dest_dir, "wechat_qr.png"))
        print("Copied WeChat QR code to wechat_qr.png")
    else:
        # If not there, look in cropped_assets or fallback
        fallback_qr = r"d:\compro\cropped_assets\page_19_part_2.png"
        if os.path.exists(fallback_qr):
            shutil.copy2(fallback_qr, os.path.join(dest_dir, "wechat_qr.png"))
            print("Copied WeChat QR from cropped_assets")
            
    # 3. Core Products
    shutil.copy2(os.path.join(src_dir, "drawcord.jpeg"), os.path.join(dest_dir, "products", "drawcord_core.jpg"))
    shutil.copy2(os.path.join(src_dir, "drawcord with metal ending.jpeg"), os.path.join(dest_dir, "products", "drawcord_metal.jpg"))
    shutil.copy2(os.path.join(src_dir, "drawcord with clear plastic ending.jpeg"), os.path.join(dest_dir, "products", "drawcord_plastic.jpg"))
    shutil.copy2(os.path.join(src_dir, "elastic band.jpeg"), os.path.join(dest_dir, "products", "elastic_band.jpg"))
    shutil.copy2(os.path.join(src_dir, "elastic woven.jpeg"), os.path.join(dest_dir, "products", "elastic_woven.jpg"))

    # 4. Map the factory IMG_* photos to products (as they are product shots on a table!)
    product_img_map = {
        "IMG_2967.jpg": "products/tape_blue_1.jpg",
        "IMG_2968.jpg": "products/tape_blue_2.jpg",
        "IMG_2970.jpg": "products/tape_checkerboard_1.jpg",
        "IMG_2971.jpg": "products/tape_checkerboard_2.jpg",
        "IMG_2972.jpg": "products/drawcord_purple_1.jpg",
        "IMG_2973.jpg": "products/drawcord_purple_2.jpg",
        "IMG_2974.jpg": "products/elastic_spool_1.jpg",
        "IMG_2975.jpg": "products/elastic_spool_2.jpg",
        "IMG_2977.jpg": "products/elastic_buttonhole_1.jpg",
        "IMG_2978.jpg": "products/elastic_buttonhole_2.jpg",
        "IMG_2979.jpg": "products/elastic_buttonhole_3.jpg",
    }
    
    for src_name, dest_name in product_img_map.items():
        src_path = os.path.join(src_dir, src_name)
        if os.path.exists(src_path):
            shutil.copy2(src_path, os.path.join(dest_dir, dest_name))
            print(f"Mapped product shot: {src_name} -> {dest_name}")
            
    # 5. Map the WhatsApp images to factory (since they are machine shots!)
    whatsapp_map = {
        "WhatsApp Image 2026-06-05 at 10.34.58.jpeg": "factory/machinery_winding.jpg",
        "WhatsApp Image 2026-06-05 at 10.34.58 (1).jpeg": "factory/machinery_winding_wide.jpg",
        "WhatsApp Image 2026-06-05 at 10.35.04.jpeg": "factory/machinery_loom.jpg",
        "WhatsApp Image 2026-06-05 at 11.08.45.jpeg": "factory/machinery_knitting.jpg",
    }
    for src_name, dest_name in whatsapp_map.items():
        src_path = os.path.join(src_dir, src_name)
        if os.path.exists(src_path):
            shutil.copy2(src_path, os.path.join(dest_dir, dest_name))
            print(f"Mapped machinery shot: {src_name} -> {dest_name}")

    # 6. Certificates
    grs_dir = os.path.join(src_dir, "SERTIFIKAT", "sc_cb-gss_GSS-GRS-20215940_20260127-GRS-Certificate-PT.-Perfect-Garment-Accessories")
    if os.path.exists(grs_dir):
        for i in range(1, 4):
            fn = f"sc_cb-gss_GSS-GRS-20215940_20260127 GRS Certificate PT. Perfect Garment Accessories_page-000{i}.jpg"
            shutil.copy2(os.path.join(grs_dir, fn), os.path.join(dest_dir, "certs", f"grs_page_{i}.jpg"))
            
    oeko_dir = os.path.join(src_dir, "SERTIFIKAT", "26.HID.18587-Oekotex-Certificate-PT.-Perfect-Garment-Accessories")
    if os.path.exists(oeko_dir):
        fn = "26.HID.18587 Oekotex Certificate PT. Perfect Garment Accessories_page-0001.jpg"
        shutil.copy2(os.path.join(oeko_dir, fn), os.path.join(dest_dir, "certs", "oeko_page_1.jpg"))
        
    slf_dir = os.path.join(src_dir, "SERTIFIKAT", "SLF-PT.-PERFECT-GARMENT-ACCESSORIES-2025")
    if os.path.exists(slf_dir):
        for i in range(1, 4):
            fn = f"SLF PT. PERFECT LOGISTICS" # Wait, let's verify name
            fn = f"SLF PT. PERFECT GARMENT ACCESSORIES 2025_page-000{i}.jpg"
            shutil.copy2(os.path.join(slf_dir, fn), os.path.join(dest_dir, "certs", f"slf_page_{i}.jpg"))

    print("Restructuring complete!")

if __name__ == "__main__":
    rename_and_restructure()
