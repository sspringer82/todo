const config = {
  url: {
    "todo": {
      extension: ['_embed=subtasks&_expand=category'],
      appendExtension(): string {
        if (this.extension) {
          return `?${this.extension.join('&')}`;
        }
        return '';
      },
      get(): string {
        return `http://localhost:3001/todos${this.appendExtension()}`;
      }, getOne(id: number): string {
        return `http://localhost:3001/todos/${id}${this.appendExtension()}`;
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