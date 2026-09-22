"use client";

import styles from "./index.module.css";
import { FieldLabel } from "../FieldLabel";
import { useRouter } from "next/navigation";
import Button from "../Button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    customerFormSchema,
    CustomerFormSchemaType,
    prefectures,
} from "@/app/_schemas/customerForm";
import { useEffect } from "react";
import { CustomerFormInput } from "../CustomerFormInput";

const STORAGE_KEY = "orderForm";

const dummyForm: CustomerFormSchemaType = {
    lastName: "山田",
    firstName: "太郎",
    lastNameKana: "ヤマダ",
    firstNameKana: "タロウ",
    postalCode: "1500001",
    prefecture: "東京都",
    city: "渋谷区渋谷",
    address: "1-2-3",
    building: "テストマンション101",
    email: "test@example.com",
    phone: "09012345678",
    birthYear: "1990",
    birthMonth: "1",
    birthDay: "1",
    gender: "male",
    isMember: "no",
    password: "",
    passwordConfirm: "",
    autoLogin: false,
};

export function CustomerInfoForm() {
    const years = Array.from({ length: 100 }, (_, i) => 2026 - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    const router = useRouter();
    const onSubmit = (data: CustomerFormSchemaType) => {
        router.push("/confirm");
    };

    const {
        register,
        watch,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<CustomerFormSchemaType>({
        resolver: zodResolver(customerFormSchema),
        defaultValues: {
            gender: "noAnswer",
            isMember: "no",
            autoLogin: false,
        },
    });
    const isMember = watch("isMember");

    // マウント時にlocalStorageから復元
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            reset(JSON.parse(saved));
        }
    }, [reset]);

    // 入力値が変わるたびにlocalStorageへ保存
    useEffect(() => {
        const subscription = watch((value) => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    return (
        <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
            {/* 開発環境でのみ表示されるテスト用ボタン */}
            {process.env.NODE_ENV === "development" && (
                <button
                    type="button"
                    onClick={() => reset(dummyForm)}
                    className={styles.debugButton}
                >
                    テストデータを入力
                </button>
            )}
            {/* お客様情報入力カード */}
            <div className={styles.card}>
                <h2 className={styles.title}>お客様情報入力</h2>

                <div className={styles.field}>
                    <FieldLabel label="お名前" required />
                    <div className={styles.row}>
                        <CustomerFormInput
                            {...register("lastName")}
                            placeholder="姓"
                            maxLength={50}
                            className={styles.input}
                            error={errors.lastName?.message}
                            wrapperClassName={styles.inputWrap}
                        />
                        <CustomerFormInput
                            {...register("firstName")}
                            placeholder="名"
                            maxLength={50}
                            className={styles.input}
                            error={errors.firstName?.message}
                            wrapperClassName={styles.inputWrap}
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <FieldLabel label="フリガナ" required />
                    <div className={styles.row}>
                        <CustomerFormInput
                            {...register("lastNameKana")}
                            placeholder="セイ"
                            maxLength={50}
                            className={styles.input}
                            error={errors.lastNameKana?.message}
                            wrapperClassName={styles.inputWrap}
                        />
                        <CustomerFormInput
                            {...register("firstNameKana")}
                            placeholder="メイ"
                            maxLength={50}
                            className={styles.input}
                            error={errors.firstNameKana?.message}
                            wrapperClassName={styles.inputWrap}
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <FieldLabel label="郵便番号（半角）" required />
                    <div className={styles.row}>
                        <CustomerFormInput
                            {...register("postalCode")}
                            placeholder="郵便番号"
                            maxLength={7}
                            className={styles.input}
                            error={errors.postalCode?.message}
                            wrapperClassName={styles.inputWrap}
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <FieldLabel label="都道府県" required />
                    <select
                        className={styles.select}
                        {...register("prefecture")}
                    >
                        <option value="" disabled>
                            選択してください
                        </option>
                        {prefectures.map((pref) => (
                            <option key={pref} value={pref}>
                                {pref}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.field}>
                    <FieldLabel label="市区町村" required />
                    <CustomerFormInput
                        {...register("city")}
                        placeholder="渋谷区渋谷"
                        maxLength={100}
                        className={styles.input}
                        error={errors.city?.message}
                        wrapperClassName={styles.inputWrap}
                    />
                </div>

                <div className={styles.field}>
                    <FieldLabel label="それ以降の住所" required />
                    <CustomerFormInput
                        {...register("address")}
                        placeholder="会社町1-2-3"
                        maxLength={100}
                        className={styles.input}
                        error={errors.address?.message}
                        wrapperClassName={styles.inputWrap}
                    />
                </div>

                <div className={styles.field}>
                    <FieldLabel label="マンション名等" />
                    <CustomerFormInput
                        {...register("building")}
                        placeholder="〇〇マンション101"
                        maxLength={100}
                        className={styles.input}
                        error={errors.building?.message}
                        wrapperClassName={styles.inputWrap}
                    />
                </div>

                <div className={styles.field}>
                    <FieldLabel label="メールアドレス（半角）" required />
                    <CustomerFormInput
                        {...register("email")}
                        placeholder="メールアドレス（半角）"
                        maxLength={100}
                        className={styles.input}
                        error={errors.email?.message}
                        wrapperClassName={styles.inputWrap}
                    />
                    <p className={styles.note}>確認用：</p>
                </div>

                <div className={styles.field}>
                    <FieldLabel label="電話番号（半角）" required />
                    <CustomerFormInput
                        {...register("phone")}
                        placeholder="09012345678"
                        maxLength={11}
                        className={styles.input}
                        error={errors.phone?.message}
                        wrapperClassName={styles.inputWrap}
                    />
                </div>

                <div className={styles.field}>
                    <FieldLabel label="生年月日" required />
                    <div className={styles.dateRow}>
                        <select
                            className={styles.selectSmall}
                            {...register("birthYear")}
                        >
                            {years.map((y) => (
                                <option key={y} value={y}>
                                    {y}
                                </option>
                            ))}
                        </select>
                        <span>年</span>
                        <select
                            className={styles.selectSmall}
                            {...register("birthMonth")}
                        >
                            {months.map((m) => (
                                <option key={m} value={m}>
                                    {m}
                                </option>
                            ))}
                        </select>
                        <span>月</span>
                        <select
                            className={styles.selectSmall}
                            {...register("birthDay")}
                        >
                            {days.map((d) => (
                                <option key={d} value={d}>
                                    {d}
                                </option>
                            ))}
                        </select>
                        <span>日</span>
                    </div>
                </div>

                <div className={styles.field}>
                    <FieldLabel label="性別" required />
                    <div className={styles.radioRow}>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                value="male"
                                {...register("gender")}
                            />
                            男性
                        </label>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                value="female"
                                {...register("gender")}
                            />
                            女性
                        </label>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                value="none"
                                {...register("gender")}
                            />
                            どちらでもない
                        </label>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                value="noAnswer"
                                {...register("gender")}
                            />
                            回答しない
                        </label>
                    </div>
                </div>
            </div>

            {/* 会員登録カード */}
            <div className={styles.memberCard}>
                <h3 className={styles.memberTitle}>
                    BlueNovaに会員登録して、次回以降の購入を簡単に。
                </h3>
                <p className={styles.memberDescription}>
                    BlueNova会員に登録いただくと、次回からお名前・住所等を入力しなくてもカンタンに購入できます。会員専用のパスワード設定が必要です。
                </p>

                <div className={styles.field}>
                    <FieldLabel label="BlueNova会員に登録する（無料）" />
                    <div className={styles.radioRow}>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                value="yes"
                                {...register("isMember")}
                            />
                            する
                        </label>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                value="no"
                                {...register("isMember")}
                            />
                            しない
                        </label>
                    </div>
                </div>

                {isMember === "yes" && (
                    <>
                        <div className={styles.field}>
                            <FieldLabel label="パスワード" required />
                            <CustomerFormInput
                                {...register("password")}
                                placeholder="半角英数字8〜20文字"
                                minLength={8}
                                maxLength={20}
                                className={styles.input}
                                error={errors.password?.message}
                                wrapperClassName={styles.inputWrap}
                            />
                        </div>

                        <div className={styles.field}>
                            <FieldLabel label="パスワード（確認）" required />
                            <CustomerFormInput
                                {...register("passwordConfirm")}
                                placeholder="半角英数字8〜20文字"
                                minLength={8}
                                maxLength={20}
                                className={styles.input}
                                error={errors.passwordConfirm?.message}
                                wrapperClassName={styles.inputWrap}
                            />
                        </div>

                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" {...register("autoLogin")} />
                            次回から自動ログインする
                        </label>
                    </>
                )}
            </div>

            <p className={styles.agreement}>
                当社の
                <Link className={styles.link} href="/sorry">
                    プライバシーポリシー
                </Link>
                および
                <Link className={styles.link} href="/sorry">
                    サイト利用規約
                </Link>
                、ならびに広告メール・ショートメッセージの受信に同意のうえボタンを押してください。
            </p>
            <Button type="submit" className={styles.toProcessButton}>
                確認画面へ進む
            </Button>
        </form>
    );
}
