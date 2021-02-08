drop table playlist;
drop table song;

create table song(
	song_id serial primary key not null,
	title text not null,
	artist text not null,
	year text not null,
	web_url text,
	img_url text,
	price int not null,
	clickes integer not null, 
	CONSTRAINT pk_song PRIMARY KEY  (song_id)
);

create table playlist
(
    playlist_id integer not null,
    song_id integer not null,
		playlist_name text not null,
    CONSTRAINT pk_playlist PRIMARY KEY  (playlist_id)
);


alter table playlist add constraint fk_playlistsongid
	foreign key (song_id) references song (song_id) on delete no action on update no action;

insert into playlist (song_id, playlist_name) values 
(23, 'Workout'),
(45, 'Workout'),
(67, 'Workout'),
(35, 'Lo-Fi'),
(43, 'Lo-Fi'),
(123, 'Example'),
(111, 'Example'),
(105, 'Example'),
(67, 'Classical'),
(98, 'Classical'),
(87, 'Dance'),
(76, 'Dance'),
(65, 'Dance'),
(54, 'Hype'),
(43, 'Hype'),
(21, 'Hype'),
(89, 'Jazz'),
(45, 'Jazz'),
(78, 'Jazz');


select * from song;

select * from playlist;
