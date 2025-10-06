export type FieldError = {
    field: string;
    message: string;
}

export const digitsOnly = /^\d+$/;
export const yearRegex = /^(18|19|20|21)\d{2}$/;

export function validateBook(form: HTMLFormElement): FieldError[] {
    const title = (form.querySelector("#bookTitle") as HTMLInputElement).value.trim();
    const author = (form.querySelector("#bookAuthor") as HTMLInputElement).value.trim();
    const year = (form.querySelector("#bookYear") as HTMLInputElement).value.trim();

    const errors: FieldError[] = [];
    if (!title) errors.push({ field: "bookTitle", message: "Це поле є обов'язковим" });
    if (!author) errors.push({ field: "bookAuthor", message: "Це поле є обов'язковим" });
    if (!year) errors.push({ field: "bookYear", message: "Це поле є обов'язковим" });
    else if (!yearRegex.test(year)) errors.push({ field: "bookYear", message: "Введіть коректний рік (напр. 2004)" });
    return errors;
}

export function validateUser(form: HTMLFormElement): FieldError[] {
    const id = (form.querySelector("#userId") as HTMLInputElement).value.trim();
    const name = (form.querySelector("#userName") as HTMLInputElement).value.trim();
    const email = (form.querySelector("#userEmail") as HTMLInputElement).value.trim();

    const errors: FieldError[] = [];
    if (!id) errors.push({ field: "userId", message: "Це поле є обов'язковим" });
    else if (!digitsOnly.test(id)) errors.push({ field: "userId", message: "Лише цифри" });
    if (!name) errors.push({ field: "userName", message: "Це поле є обов'язковим" });
    if (!email) errors.push({ field: "userEmail", message: "Це поле є обов'язковим" });
    return errors;
}

export function applyErrors(form: HTMLFormElement, errors: FieldError[]) {
    form.querySelectorAll<HTMLInputElement>(".form-control").forEach(el => {
        el.classList.remove("is-invalid");
        const fb = el.closest(".mb-3")?.querySelector(".invalid-feedback") as HTMLElement | null;
        if (fb) fb.textContent = "";
    });

    errors.forEach(err => {
        const el = form.querySelector<HTMLInputElement>("#" + err.field)!;
        el.classList.add("is-invalid");
        const fb = el.closest(".mb-3")?.querySelector(".invalid-feedback") as HTMLElement | null;
        if (fb) fb.textContent = err.message;
    })
}