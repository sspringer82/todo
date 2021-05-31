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
        return `${process.env.REACT_APP_BACKEND_URL}/todos${this.appendExtension()}`;
      }, getOne(id: number): string {
        return `${process.env.REACT_APP_BACKEND_URL}/todos/${id}${this.appendExtension()}`;
      }, create(): string {
        return this.get();
      }, edit(id: number): string {
        return this.getOne(id);
      }, delete(id: number): string {
        return this.getOne(id);
      }
    },
    "subtask": {
      base(): string {
        return 'http://localhost:3001/subtask';
      },
      create(): string {
        return this.base();
      }, edit(id: number): string {
        return `${this.base()}/${id}`;
      }, delete(id: number): string {
        return `${this.base()}/${id}`;
      }
    }
  }
};

export default config;