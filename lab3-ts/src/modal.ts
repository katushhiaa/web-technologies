// src/modal.ts
export class ModalService {
    private get modalEl(): HTMLElement {
        const el = document.getElementById("appModal");
        if (!el) throw new Error('Modal element #appModal not found in DOM');
        return el;
    }
    private get titleEl(): HTMLElement {
        const el = this.modalEl.querySelector(".modal-title") as HTMLElement | null;
        if (!el) throw new Error(".modal-title not found");
        return el;
    }
    private get bodyEl(): HTMLElement {
        const el = this.modalEl.querySelector(".modal-body") as HTMLElement | null;
        if (!el) throw new Error(".modal-body not found");
        return el;
    }
    private get footerEl(): HTMLElement {
        const el = this.modalEl.querySelector(".modal-footer") as HTMLElement | null;
        if (!el) throw new Error(".modal-footer not found");
        return el;
    }

    private getBsModal() {
        // @ts-ignore
        const Modal = (window as any).bootstrap?.Modal;
        if (!Modal) return null;
        // створюємо або повертаємо існуючий інстанс
        // @ts-ignore
        return Modal.getOrCreateInstance(this.modalEl);
    }

    async info(title: string, html: string, okText = "Закрити"): Promise<void> {
        const bs = this.getBsModal();
        this.titleEl.textContent = title;
        this.bodyEl.innerHTML = html;
        this.footerEl.innerHTML = `<button type="button" class="btn btn-primary" data-bs-dismiss="modal">${okText}</button>`;

        if (bs) {
            bs.show();
            await new Promise<void>(res =>
                this.modalEl.addEventListener("hidden.bs.modal", () => res(), { once: true })
            );
        } else {
            // fallback, якщо bootstrap не підключився
            alert(`${title}\n\n${this.bodyEl.textContent || ""}`);
        }
    }

    async prompt(title: string, placeholder = "ID"): Promise<string | null> {
        const bs = this.getBsModal();
        this.titleEl.textContent = title;
        this.bodyEl.innerHTML = `
      <input id="modalInput" class="form-control" placeholder="${placeholder}" />
      <div class="form-text">Лише цифри</div>`;
        this.footerEl.innerHTML = `
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Скасувати</button>
      <button id="modalOk" type="button" class="btn btn-primary">Зберегти</button>`;

        if (!bs) {
            const val = prompt(title) || "";
            return val.trim() ? val.trim() : null;
        }

        bs.show();
        return await new Promise<string | null>((resolve) => {
            this.footerEl.querySelector<HTMLButtonElement>("#modalOk")!.onclick = () => {
                const val = (this.bodyEl.querySelector("#modalInput") as HTMLInputElement).value.trim();
                bs.hide();
                resolve(val || null);
            };
            this.modalEl.addEventListener("hidden.bs.modal", () => resolve(null), { once: true });
        });
    }
}
