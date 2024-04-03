
import 'bootstrap/dist/css/bootstrap.min.css';


import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

 
  return (
    <html lang="en">
      <body className="p-0 m-0 box-border min-h-screen bg-white relative max-w-screen-2xl mx-auto">
        
       {children}
      </body>
    </html>
  );
}
