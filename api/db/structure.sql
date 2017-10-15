CREATE TABLE todo (
  id INTEGER PRIMARY KEY,
  title TEXT,
  status INTEGER,
  created INTEGER
);

INSERT INTO todo (title, status, created) VALUES
('aufstehen', 1, 1508052347217),
('essen', 1, 1508052347217),
('schlafen gehen', 0, 1508052347217)