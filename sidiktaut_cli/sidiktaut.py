#!/usr/bin/env python3
import os
import sys
import base64
import requests
import argparse
from dotenv import load_dotenv
from colorama import Fore, Style, init

# Inisialisasi Colorama
init(autoreset=True)

# Load environment variables
load_dotenv()

# Konfigurasi
API_KEY = os.getenv('VT_API_KEY')
BASE_URL = "https://www.virustotal.com/api/v3/urls/"

def print_banner():
    # Menggunakan r""" (Raw String) agar backslash (\) terbaca sebagai gambar, bukan kode.
    banner = r"""
      _____ _    _ _ _   _______           _   
     / ____(_)  | (_) | |__   __|         | |  
    | (___  _ __| |_| | __ | | __ _ _   _| |_ 
     \___ \| |/ _` | | |/ / | |/ _` | | | | __|
     ____) | | (_| | |   <  | | (_| | |_| | |_ 
    |_____/|_|\__,_|_|_|\_\ |_|\__,_|\__,_|\__|
    """
    print(Fore.CYAN + banner)
    print(Fore.YELLOW + "    Sidiktaut - Link analyzer")
    print(Fore.WHITE + "    Created by Yudha P., Bram L.M,& Gyelgha C. for Mini PBL Project" + Style.RESET_ALL + "\n")

def get_url_id(url):
    try:
        return base64.urlsafe_b64encode(url.encode()).decode().strip("=")
    except Exception as e:
        print(f"{Fore.RED}[!] Gagal encode URL: {e}")
        sys.exit(1)

def scan_url(target_url):
    if not API_KEY:
        print(f"{Fore.RED}API KEY tidak ditemukan! Pastikan sudah ada API KEY di file.env")
        print(f"{Fore.WHITE}Pastikan file .env ada dan berisi VT_API_KEY=xxx")
        sys.exit(1)

    print(f"{Fore.BLUE}[*] Sedang menganalisis target: {Fore.WHITE}{target_url}")
    
    url_id = get_url_id(target_url)
    headers = {
        "x-apikey": API_KEY,
        "accept": "application/json"
    }

    try:
        response = requests.get(f"{BASE_URL}{url_id}", headers=headers)

        if response.status_code == 200:
            data = response.json()
            attributes = data['data']['attributes']
            stats = attributes['last_analysis_stats']
            
            print(f"{Fore.GREEN}[+] Analisis Selesai!\n")
            print(f"    {Fore.WHITE}Reputasi Score : {attributes.get('reputation', 0)}")
            print(f"    {Fore.WHITE}--------------------------------")
            print(f"    {Fore.RED}Malicious      : {stats['malicious']}")
            print(f"    {Fore.YELLOW}Suspicious     : {stats['suspicious']}")
            print(f"    {Fore.GREEN}Harmless       : {stats['harmless']}")
            print(f"    {Fore.CYAN}Undetected     : {stats['undetected']}")
            print(f"    {Fore.WHITE}--------------------------------")

            if stats['malicious'] > 0:
                print(f"\n{Fore.RED}[!!!] KESIMPULAN: LINK INI BERBAHAYA!")
            elif stats['suspicious'] > 0:
                print(f"\n{Fore.YELLOW}[!] KESIMPULAN: LINK INI MENCURIGAKAN.")
            else:
                print(f"\n{Fore.GREEN}[OK] KESIMPULAN: Link ini terlihat aman.")

        elif response.status_code == 404:
            print(f"{Fore.YELLOW}[!] URL belum pernah dipindai oleh VirusTotal sebelumnya.")
            print(f"    {Fore.WHITE}Tips: Submit URL ini melalui website VirusTotal untuk analisis pertama.")
        
        elif response.status_code == 401:
             print(f"{Fore.RED}[!] API Key salah atau kadaluarsa/limit habis.")

        else:
            print(f"{Fore.RED}[!] Error dari server: {response.status_code}")

    except Exception as e:
        print(f"{Fore.RED}[!] Terjadi kesalahan koneksi: {e}")

def main():
    print_banner()
    parser = argparse.ArgumentParser(description="CLI Tool untuk scan link berbahaya")
    parser.add_argument("-u", "--url", help="URL yang ingin di-scan", type=str)
    args = parser.parse_args()

    if args.url:
        scan_url(args.url)
    else:
        try:
            target = input(f"{Fore.GREEN}[?] Masukkan URL target: {Fore.WHITE}")
            if target:
                scan_url(target)
            else:
                print(f"{Fore.RED}[!] URL tidak boleh kosong.")
        except KeyboardInterrupt:
            print(f"\n{Fore.YELLOW}[!] Program dihentikan user.")
            sys.exit()

if __name__ == "__main__":
    main()
