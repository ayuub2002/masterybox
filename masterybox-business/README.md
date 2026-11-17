# Masterybox – Mystery Purchase Demo

A simple HTML, CSS and Vanilla JavaScript prototype for a mystery-product business.

## Customer journey
1. Customer scans the business QR code and opens `index.html`.
2. Customer presses **Open My Mystery Box**.
3. The website randomly selects an active product and reveals its letter, product name and price.
4. Customer shows the result to the shop staff and pays in person to receive the product.

## Files
- `index.html` – customer experience
- `style.css` – design
- `app.js` – random product selection and result storage
- `admin.html` / `admin.js` – edit products, prices, active status and selection weights
- `qr-poster.html` – create and download a QR code for your published customer page

## Run on Windows
1. Extract the ZIP file.
2. Open the folder in VS Code.
3. Open `index.html` in a browser (or use the VS Code Live Server extension).
4. Open `admin.html` to manage the sample products.
5. Open `qr-poster.html`, paste the public URL of your deployed customer page, and generate the QR.


## Important prototype limitations
This is a frontend-only demonstration:
- Product settings and customer results are saved in each browser's localStorage. They do not sync between devices.
- A customer could clear browser data or use another device to open another box.
- The admin password is visible in the JavaScript and is not secure.
- No online payment is processed. The customer pays the shop after showing the revealed result.
- For a real business, use a backend/database to share product settings, record each opening, prevent repeat claims, protect the admin account, and verify payments.

## Suggested real-business flow
For the first small pilot, display the QR at the shop counter. Staff should confirm the revealed product and price, collect payment, then hand over the product. Explain the rules and prices clearly before the customer opens a box.
