import * as z from "zod";

export const prefectures = [
    "北海道",
    "青森県",
    "岩手県",
    "宮城県",
    "秋田県",
    "山形県",
    "福島県",
    "茨城県",
    "栃木県",
    "群馬県",
    "埼玉県",
    "千葉県",
    "東京都",
    "神奈川県",
    "新潟県",
    "富山県",
    "石川県",
    "福井県",
    "山梨県",
    "長野県",
    "岐阜県",
    "静岡県",
    "愛知県",
    "三重県",
    "滋賀県",
    "京都府",
    "大阪府",
    "兵庫県",
    "奈良県",
    "和歌山県",
    "鳥取県",
    "島根県",
    "岡山県",
    "広島県",
    "山口県",
    "徳島県",
    "香川県",
    "愛媛県",
    "高知県",
    "福岡県",
    "佐賀県",
    "長崎県",
    "熊本県",
    "大分県",
    "宮崎県",
    "鹿児島県",
    "沖縄県",
] as const;

export const customerFormSchema = z
    .object({
        lastName: z
            .string()
            .min(1, { error: "姓を入力してください。" })
            .max(50, { error: "姓は50文字以内で入力してください。" }),
        firstName: z
            .string()
            .min(1, { error: "名を入力してください。" })
            .max(50, { error: "名は50文字以内で入力してください。" }),
        lastNameKana: z
            .string()
            .min(1, { error: "セイを入力してください。" })
            .max(50, { error: "セイは50文字以内で入力してください。" }),
        firstNameKana: z
            .string()
            .min(1, { error: "メイを入力してください。" })
            .max(50, { error: "メイは50文字以内で入力してください。" }),
        postalCode: z
            .string()
            .length(7, "郵便番号は7桁で入力してください")
            .regex(/^\d+$/, "半角数字のみで入力してください"),
        prefecture: z.enum(prefectures, {
            error: "都道府県を選択してください",
        }),
        city: z
            .string()
            .min(1, { error: "市区町村を入力してください。" })
            .max(100, { error: "市区町村は100文字以内で入力してください。" }),
        address: z
            .string()
            .min(1, { error: "それ以降の住所を入力してください。" })
            .max(100, {
                error: "それ以降の住所は100文字以内で入力してください。",
            }),
        building: z
            .string()
            .max(100, {
                error: "マンション名は100文字以内で入力してください。",
            })
            .optional(),
        email: z
            .string()
            .trim()
            .pipe(z.email({ error: "有効なメールアドレスを入力してください" })),
        phone: z
            .string()
            .trim()
            .regex(/^\d{10,11}$/, {
                error: "電話番号を半角数字で正しく入力してください",
            }),
        birthYear: z.string(),
        birthMonth: z.string(),
        birthDay: z.string(),
        gender: z.enum(["male", "female", "none", "noAnswer"]),
        isMember: z.enum(["yes", "no"]),
        password: z.string(),
        passwordConfirm: z.string(),
        autoLogin: z.boolean(),
    })
    .refine(
        (data) => {
            if (data.isMember === "no") return true;
            return data.password.length >= 8 && data.password.length <= 20;
        },
        {
            error: "パスワードは8〜20文字で入力してください",
            path: ["password"],
        },
    )
    .refine(
        (data) => {
            if (data.isMember === "no") return true;
            return data.password === data.passwordConfirm;
        },
        {
            error: "パスワードが一致しません。",
            path: ["passwordConfirm"],
        },
    );

export type CustomerFormSchemaType = z.infer<typeof customerFormSchema>;
