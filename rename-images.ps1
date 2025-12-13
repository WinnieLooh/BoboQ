# Interactive Image Renaming Script
# This script helps you rename product images based on what you see

$imageBasePath = "f:\Owncloud\Privat\Projekte\GitHub\BoboQWebsite\public\images"

# Define categories and their target folders
$categories = @(
    @{ Folder = "POPBALL - BOBOQ"; NewFolder = "boba"; Description = "Popping Boba (Fruchtgeschmäcker)" }
    @{ Folder = "SYRUP - BOBOQ"; NewFolder = "sirup"; Description = "Sirupe" }
    @{ Folder = "TAPIOCA - BOBOQ"; NewFolder = "tapioka"; Description = "Tapioka-Perlen" }
    @{ Folder = "POWDER - BOBOQ"; NewFolder = "tee"; Description = "Tee/Pulver" }
    @{ Folder = "EQUIPMENT-BOBOQ"; NewFolder = "zubehor"; Description = "Zubehör" }
    @{ Folder = "JELLY-BOBOQ"; NewFolder = "jelly"; Description = "Jelly" }
    @{ Folder = "CRYSTAL_BALL-BOBOQ"; NewFolder = "crystal"; Description = "Crystal Balls" }
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  BoboQ Image Renaming Tool" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Anleitung:" -ForegroundColor Yellow
Write-Host "  - Jedes Bild wird automatisch geöffnet"
Write-Host "  - Gib den Produktnamen ein (z.B. 'erdbeer' für Erdbeer Boba)"
Write-Host "  - Drücke ENTER ohne Eingabe, um das Bild zu überspringen"
Write-Host "  - Gib 'q' ein, um das Script zu beenden"
Write-Host ""

foreach ($cat in $categories) {
    $folderPath = Join-Path $imageBasePath $cat.Folder
    
    if (-not (Test-Path $folderPath)) {
        Write-Host "Ordner nicht gefunden: $($cat.Folder)" -ForegroundColor Red
        continue
    }
    
    $images = Get-ChildItem -Path $folderPath -Filter "*.png" | Sort-Object Name
    
    if ($images.Count -eq 0) {
        Write-Host "Keine Bilder in: $($cat.Folder)" -ForegroundColor Yellow
        continue
    }
    
    Write-Host "`n" + "="*60 -ForegroundColor Green
    Write-Host "Kategorie: $($cat.Description)" -ForegroundColor Green
    Write-Host "Ordner: $($cat.Folder)" -ForegroundColor Green
    Write-Host "Anzahl Bilder: $($images.Count)" -ForegroundColor Green
    Write-Host "="*60 -ForegroundColor Green
    
    foreach ($image in $images) {
        Write-Host "`n----------------------------------------" -ForegroundColor Cyan
        Write-Host "Aktuelles Bild: $($image.Name)" -ForegroundColor White
        Write-Host "Vollständiger Pfad: $($image.FullName)" -ForegroundColor Gray
        
        # Open image in default viewer
        Start-Process $image.FullName
        
        # Wait a moment for the image to open
        Start-Sleep -Milliseconds 500
        
        # Ask for new name
        $newName = Read-Host "`nNeuer Name (ohne Erweiterung, z.B. 'erdbeer_boba')"
        
        if ($newName -eq 'q') {
            Write-Host "Script beendet." -ForegroundColor Yellow
            return
        }
        
        if ([string]::IsNullOrWhiteSpace($newName)) {
            Write-Host "Übersprungen." -ForegroundColor Yellow
            continue
        }
        
        # Clean the name (replace spaces with underscores, convert to lowercase)
        $newName = $newName.Trim().ToLower() -replace '\s+', '_'
        
        # Add category suffix if not already present
        $suffix = "_$($cat.NewFolder)"
        if ($newName -notlike "*$suffix") {
            $newName = $newName + $suffix
        }
        
        $newFileName = "$newName.jpg"
        $newPath = Join-Path $imageBasePath $newFileName
        
        # Check if target file already exists
        if (Test-Path $newPath) {
            $overwrite = Read-Host "Datei '$newFileName' existiert bereits. Überschreiben? (j/n)"
            if ($overwrite -ne 'j') {
                Write-Host "Übersprungen." -ForegroundColor Yellow
                continue
            }
        }
        
        try {
            # Convert PNG to JPG if needed, otherwise just copy/rename
            if ($image.Extension -eq '.png') {
                # For now, just copy the file (you can add conversion logic later if needed)
                Copy-Item -Path $image.FullName -Destination $newPath -Force
                Write-Host "Kopiert nach: $newFileName" -ForegroundColor Green
            } else {
                Move-Item -Path $image.FullName -Destination $newPath -Force
                Write-Host "Umbenannt zu: $newFileName" -ForegroundColor Green
            }
            
            # Log the mapping for products.ts update
            Add-Content -Path (Join-Path $imageBasePath "rename-log.txt") -Value "$($image.Name) -> $newFileName ($($cat.Description))"
            
        } catch {
            Write-Host "Fehler beim Umbenennen: $_" -ForegroundColor Red
        }
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Fertig!" -ForegroundColor Green
Write-Host "Log-Datei erstellt: $imageBasePath\rename-log.txt" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
