DB명세
=

유저
-
```
{
  profile: string,
  _id: string,
  userName: string,
  likedId: [
    string
  ]
}
```

게시글
-
```
{
  likeN: number,
  cmtN: number,
  content: string,
  pictures:[
      string
  ],
  _id: string,
  date: stirng,
  weather: {
    status: number,
    temp: number
  },
  user:{
    userId: string,
    profile: string,
    userName: string
  }
}
```

댓글
-
```
{
  userId: string,
  date: string,
  _id: string,
  postId: string,
  text: string
}
```
