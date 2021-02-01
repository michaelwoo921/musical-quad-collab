drop table playlist;
drop table user_account;
drop table song;

create table song(
	song_id int not null,
	clicked integer not null, 
	CONSTRAINT pk_song PRIMARY KEY  (song_id)
);


create table user_account(
	user_id int not null,
	username text unique not null,
	password text not null,
	role text not null,
	credits int,
	favorites integer[],
	playlists integer[],
	constraint pk_user primary key (user_id)
);

create table playlist
(
    playlist_id integer not null,
    song_id integer,
	user_id integer,
    CONSTRAINT pk_playlist PRIMARY KEY  (playlist_id)
);


alter table playlist add constraint fk_playlistsongid
	foreign key (song_id) references song (song_id) on delete no action on update no action;
alter table playlist add constraint fk_playlistuserid
	foreign key (user_id) references user_account (user_id) on delete no action on update no action;

insert into user_account (user_id, username, password, role, credits, favorites, playlists) 
     values (1, 'Cus1', 'pass', 'customer', 1, '{1,2,3}', '{11,21,31}' );
insert into user_account (user_id, username, password, role, credits, favorites, playlists) 
	 values (2, 'Cus2', 'pass', 'customer', 2, '{1,2,3}', '{11,21,31}' );
insert into user_account (user_id, username, password, role, credits, favorites, playlists) 
	 values (3, 'Cus3', 'pass', 'customer', 3, '{1,2,3}', '{11,21,31}' );


insert into song (song_id, clicked)
	values (1, 5);
insert into song (song_id, clicked)
	values (2, 0);
insert into song (song_id, clicked)
	values (3, 1);
	insert into song (song_id, clicked)
	values (4, 5);
insert into song (song_id, clicked)
	values (5, 0);
insert into song (song_id, clicked)
	values (6, 1);



insert into playlist (playlist_id, song_id, user_id)
	values (1, 2, 3);
insert into playlist (playlist_id, song_id, user_id)
	values (2, 1, 3);
insert into playlist (playlist_id, song_id, user_id)
	values (3, 2, 1);



create table mw-song
(
    song_id integer,
	clicked integer not null,
	name text,
	genre text not null,
    CONSTRAINT pk_mw-song PRIMARY KEY  (song_id)
);


insert into mw_song (song_id, clicked, name, genre) 
	values (1, 5, 'Why do we do what we do?', 'classic'),
			 (2, 5, 'I need Mercede Benz', 'soul'),
			 (3, 5, 'the best jazz song ever existed', 'jazz'),
			 (4, 5, 'Sonata', 'classic')
  


select * from user_account;

select * from song;

select * from playlist;


