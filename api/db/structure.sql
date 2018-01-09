DROP TABLE IF EXISTS todostatus;
CREATE TABLE todostatus (
  id INTEGER PRIMARY KEY,
  status TEXT
);

DROP TABLE IF EXISTS todo;
CREATE TABLE todo (
  id INTEGER PRIMARY KEY,
  title TEXT,
  status INTEGER,
  creator INTEGER,
  due TIMESTAMP,
  description TEXT,
  sequence INTEGER,
  archived INTEGER,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  list INTEGER,
  FOREIGN KEY (creator) REFERENCES user(id) ON DELETE CASCADE,
  FOREIGN KEY (list) REFERENCES list(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS todo_tag;
CREATE TABLE todo_tag (
  todo_id INTEGER,
  tag_id INTEGER,
  FOREIGN KEY (todo_id) REFERENCES todo(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tag(id) ON DELETE CASCADE
)

DROP TABLE IF EXISTS tag;
CREATE TABLE tag (
  id INTEGER PRIMARY KEY,
  title TEXT
)

DROP TABLE IF EXISTS list;
CREATE TABLE list (
  id INTEGER PRIMARY KEY,
  title TEXT,
  owner INTEGER,
  FOREIGN KEY (owner) REFERENCES user(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS userstatus;
CREATE TABLE userstatus (
  id INTEGER PRIMARY KEY,
  status TEXT
);

DROP TABLE IF EXISTS role;
CREATE TABLE role (
  id INTEGER PRIMARY KEY,
  role TEXT
);

DROP TABLE IF EXISTS config;
CREATE TABLE config (
  id INTEGER PRIMARY KEY,
  user INTEGER,
  selectedList INTEGER,
  FOREIGN KEY (user) REFERENCES user(id) ON DELETE CASCADE,
  FOREIGN KEY (selectedList) REFERENCES list(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS user;
CREATE TABLE user (
  id INTEGER PRIMARY KEY,
  username TEXT,
  password TEXT,
  isActive INTEGER,
  isAdmin INTEGER,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO user (username, password, isActive, isAdmin) VALUES 
('basti', 'test', 1, 1);

INSERT INTO todostatus (status) VALUES
('open'),
('done');

INSERT INTO list (title, owner) VALUES
('private', (SELECT id FROM user WHERE username = 'basti')),
('work', (SELECT id FROM user WHERE username = 'basti'));

INSERT INTO config (user, selectedList) VALUES
((SELECT id FROM user WHERE username = 'basti'), (SELECT id FROM list WHERE title = 'private'));

INSERT INTO todo (title, status, list, due, sequence, archived) VALUES
('aufstehen', (SELECT id FROM todostatus WHERE status = 'done'), (SELECT id FROM list WHERE title = 'private'), 1510085891651, 1, 0),
('essen', (SELECT id FROM todostatus WHERE status = 'done'), (SELECT id FROM list WHERE title = 'private'), 1510085891651, 3, 0),
('schlafen gehen', (SELECT id FROM todostatus WHERE status = 'open'), (SELECT id FROM list WHERE title = 'private'), 1510085891651, 2, 0),
('Büroschlaf!', (SELECT id FROM todostatus WHERE status = 'open'), (SELECT id FROM list WHERE title = 'work'), 1510085891651, 1, 0);