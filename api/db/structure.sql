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
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (status) REFERENCES userstatus(id) ON DELETE CASCADE,
  FOREIGN KEY (role) REFERENCES role(id) ON DELETE CASCADE
);

INSERT INTO user (username, password, isActive, isAdmin) VALUES 
('basti', 'test', 1, 1);

INSERT INTO todostatus (status) VALUES
('open'),
('done');

INSERT INTO list (title, owner) VALUES
('private', (SELECT id FROM user WHERE username = 'basti')),
('work', (SELECT id FROM user WHERE username = 'basti'));

INSERT INTO todo (title, status, list) VALUES
('aufstehen', (SELECT id FROM todostatus WHERE status = 'done'), (SELECT id FROM list WHERE title = 'private')),
('essen', (SELECT id FROM todostatus WHERE status = 'done'), (SELECT id FROM list WHERE title = 'private')),
('schlafen gehen', (SELECT id FROM todostatus WHERE status = 'open'), (SELECT id FROM list WHERE title = 'private'));