delete from Users;

insert into Users values (1, 'AshWilliams');
insert into Users values (2, 'MichMichel');
insert into Users values (3, 'AdrAucher');

delete from Conversations;

insert into Conversations values (1, 'convo1', now());
insert into Conversations values (2, 'convo2', now());
insert into Conversations values (3, 'convo3', now());

delete from Users_conversation;

insert into Users_conversation values (1, 2);
insert into Users_conversation values (3, 1);
insert into Users_conversation values (2, 3);

delete from Messages;

insert into Messages values (1, 1, 2, now());
insert into Messages values (2, 2, 1, now());
insert into Messages values (3, 3, 3, now());
insert into Messages values (4, 1, 2, now());
insert into Messages values (5, 2, 1, now());
insert into Messages values (6, 3, 3, now());