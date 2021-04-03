const config = {
  url: {
    "todo": {
      extension: ['_embed=subtask'],
      appendExtension(): string {
        if (this.extension) {
          return `?${this.extension.join('&')}`;
        }
        return '';
      },
      get(): string {
        return `http://localhost:3001/todo${this.appendExtension()}`;
      }, getOne(id: number): string {
        return `http://localhost:3001/todo/${id}${this.appendExtension()}`;
      }, create() {
        return this.get();
      }, edit(id: number): string {
        return this.getOne(id);
      }, delete(id: number): string {
        return this.getOne(id);
      }
    }
  }
};

export default config;