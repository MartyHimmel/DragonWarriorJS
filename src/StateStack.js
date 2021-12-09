export default class StateStack {
    #stack = [];

    update() {
        if (this.#stack.length) {
            this.#stack[this.#stack.length - 1].update();
        }
    }

    render() {
        if (this.#stack.length) {
            this.#stack[this.#stack.length - 1].render();
        }
    }

    push(state) {
        this.#stack.push(state);
    }

    pop(count = 1) {
        for (let i = 0; i < count; i++) {
            this.#stack.pop();
        }
    }

    top() {
        return this.#stack[this.#stack.length - 1];
    }
}
