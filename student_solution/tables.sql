drop table Messages;
drop table Users_conversation;
drop table Conversations;
drop table Users;

create table Users(
    user_id int auto_increment,
    username varchar(10) not null,
    constraint PK_user_id primary key (user_id)
);

create table Conversations(
    convo_id int auto_increment,
    convo_name varchar(30) not null default 'Chat',
    created_on timestamp not null default now(),
    constraint PK_convo_id primary key (convo_id)
);

create table Users_conversation(
    user_id int,
    convo_id int,
    constraint PK_user_convo primary key (user_id, convo_id)
);

create table Messages(
    message_id int auto_increment,
    convo_id int,
    user_id int,
    sent_time timestamp not null default now(),
    constraint PK_Messages primary key (message_id)
);

alter table Users_conversation
add constraint fk_Userconvo_user
foreign key (user_id) references Users(user_id)
ON DELETE CASCADE ON UPDATE CASCADE;

alter table Users_conversation
add constraint fk_Userconvo_convo
foreign key (convo_id) references Conversations(convo_id)
ON DELETE CASCADE ON UPDATE CASCADE;

alter table Messages
add constraint fk_Messages_user
foreign key (user_id) references Users(user_id)
ON DELETE CASCADE ON UPDATE CASCADE;

alter table Messages
add constraint fk_Messages_convo
foreign key (convo_id) references Conversations(convo_id)
ON DELETE CASCADE ON UPDATE CASCADE;
