import { ReviewProcType } from "@/app/_types/types";
export const calcReviewScore = (reviews: ReviewProcType[]) => {
    if (reviews.length == 0) return 0;
    let totalRating = 0;
    for (const review of reviews) {
        totalRating = totalRating + review.rating;
    }
    return Math.round((totalRating / reviews.length) * 10) / 10;
};
