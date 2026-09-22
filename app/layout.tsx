import Header from "./_components/Header";
import Footer from "./_components/Footer";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { CartProvider } from "@/contexts/CartContext";
import { ToastProvider } from "@/contexts/ToastContext";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body>
                <ToastProvider>
                    <AuthProvider>
                        <FavoritesProvider>
                            <CartProvider>
                                <Header></Header>
                                {children}
                                <Footer></Footer>
                            </CartProvider>
                        </FavoritesProvider>
                    </AuthProvider>
                </ToastProvider>
            </body>
        </html>
    );
}
