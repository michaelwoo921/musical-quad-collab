export class Song {
	constructor(
		public title: string = '',
		public artist: string = '',
		public year: string = '',
		public web_url: string = '',
		public img_url: string = '',
		public clicks: number = 0,
		public price: number = 1,
		public song_id: number = 0
	) {}
}
