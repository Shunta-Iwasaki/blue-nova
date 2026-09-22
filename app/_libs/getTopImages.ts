// lib/getTopImages.ts
import fs from "fs";
import path from "path";

export type TopImage = {
    desktop: string;
    mobile: string;
};

export function getTopImages(): TopImage[] {
    const dir = path.join(process.cwd(), "public/top");
    const files = fs.readdirSync(dir);

    const imageFiles = files.filter((file) =>
        /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(file),
    );

    // "_sp"が付いていないファイル(=PC用のベース画像)だけを抽出
    const desktopFiles = imageFiles.filter((file) => !file.includes("_sp"));

    return desktopFiles.map((file) => {
        const ext = path.extname(file); // ".png"
        const baseName = path.basename(file, ext);
        const spFileName = `${baseName}_sp${ext}`;

        return {
            desktop: `/top/${file}`,
            mobile: `/top/${spFileName}`,
        };
    });
}
