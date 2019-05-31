interface PlayerQuery {
  hello: () => string;
}

const query: PlayerQuery = {
  hello: () => 'Hello World',
};

export default query;
