
INSERT INTO material_category (category_id, category_name) VALUES ('C001', 'Thread');
INSERT INTO material_category (category_id, category_name) VALUES ('C002', 'Cloth');
INSERT INTO material_category (category_id, category_name) VALUES ('C003', 'Button');

INSERT INTO material_type (type_id, type_name, category_id) VALUES ('T001', 'Silk', 'C001');
INSERT INTO material_type (type_id, type_name, category_id) VALUES ('T002', 'Silk', 'C002');
INSERT INTO material_type (type_id, type_name, category_id) VALUES ('T003', 'Linen', 'C001');
INSERT INTO material_type (type_id, type_name, category_id) VALUES ('T004', 'Linen', 'C002');
INSERT INTO material_type (type_id, type_name, category_id) VALUES ('T005', 'Silk Cotton', 'C003');
INSERT INTO material_type (type_id, type_name, category_id) VALUES ('T006', 'Suit', 'C003');
INSERT INTO material_type (type_id, type_name, category_id) VALUES ('T007', 'Silk Cotton', 'C002');

INSERT INTO unit (unit_id, unit_name, category_id) VALUES ('U001', 'Metres', 'C001');
INSERT INTO unit (unit_id, unit_name, category_id) VALUES ('U002', 'Metres', 'C002');
INSERT INTO unit (unit_id, unit_name, category_id) VALUES ('U003', 'Yards', 'C001');
INSERT INTO unit (unit_id, unit_name, category_id) VALUES ('U004', 'Yards', 'C002');
INSERT INTO unit (unit_id, unit_name, category_id) VALUES ('U005', 'Kilograms', 'C003');

