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
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  list INTEGER,
  FOREIGN KEY (creator) REFERENCES user(id) ON DELETE CASCADE,
  FOREIGN KEY (list) REFERENCES list(id) ON DELETE CASCADE
);

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

INSERT INTO todo (title, status, list, due) VALUES
('aufstehen', (SELECT id FROM todostatus WHERE status = 'done'), (SELECT id FROM list WHERE title = 'private'), 1510085891651),
('essen', (SELECT id FROM todostatus WHERE status = 'done'), (SELECT id FROM list WHERE title = 'private'), 1510085891651),
('schlafen gehen', (SELECT id FROM todostatus WHERE status = 'open'), (SELECT id FROM list WHERE title = 'private'), 1510085891651),
('Büroschlaf!', (SELECT id FROM todostatus WHERE status = 'open'), (SELECT id FROM list WHERE title = 'work'), 1510085891651);