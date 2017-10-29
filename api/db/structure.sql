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
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
  status INTEGER,
  role INTEGER,
  creator INTEGER,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (status) REFERENCES userstatus(id) ON DELETE CASCADE,
  FOREIGN KEY (role) REFERENCES role(id) ON DELETE CASCADE,
  FOREIGN KEY (creator) REFERENCES user(id) ON DELETE CASCADE
);

INSERT INTO userstatus (status) VALUES 
('active'),
('inactive');

INSERT INTO role (role) VALUES
('user'),
('admin');

INSERT INTO user (username, password, status, role) VALUES 
('basti', 'test', (SELECT id FROM userstatus WHERE status = 'active'), (SELECT id FROM role WHERE role = 'admin'));

INSERT INTO todostatus (status) VALUES
('open'),
('done');

INSERT INTO todo (title, status) VALUES
('aufstehen', (SELECT id FROM todostatus WHERE status = 'done')),
('essen', (SELECT id FROM todostatus WHERE status = 'done')),
('schlafen gehen', (SELECT id FROM todostatus WHERE status = 'open'));