DB명세
=

유저
-
```
{
  profile: string,
  _id: string,
  userName: string,
  sex: string,
  likedId: [
    string
  ]
}
```

게시글
-
```
{
  userId: string,
  likeN: number,
  cmtN: number,
  content: string,
  pictures:[
      string
  ],
  _id: string,
  date: stirng,
  cmtId: [
      string
  ],
  weather: number,
  temp: number
}
```

댓글
-
```
{
  userId: string,
  date: string,
  _id: string,
  postId: string
}
```
