API명세
=

baseURL:  192.168.43.226:1212

메인
-
```
GET/feed?sortN={Number}&status={Number}&temp={Number}
```

- Request
```
{
  
}
```
- Reponse
```
SUCCESS {
  feed:[
    {
      _id: string,
      content: string,
      likeN: number,
      cmtN: number,
      pictures:[
        string
      ],
      date: string,
      weather: {
        status: number,
        temp: number
      }
      user: {
        userId: string,
        profile: string,
        userName: string
      }
    }
  ]
}
```   

날씨요청
-
```
GET/weather?lat={Number}&lon={Number}
```
- Request
```
{
  
}
```
- Reponse
```
SUCCESS {
  weather: {
    status: number,
    temp: number
  }
}
```   


마이페이지보기
-
```
GET/mypage
```
- Request
```
{
 
}
```
- Reponse
```
SUCCESS {
  userName: string,
	profile: string,
} 
```

마이페이지수정
-
```
PUT/mypage
```
- Request
```
{
  userName: string,
	profile: string,
	sex: string
}
```
- Reponse
```
SUCCESS {
  
} 
```

내 피드 보기
-
```
GET/mypage/myfeed
```

- Request
```

```
- Reponse
```
SUCCESS {
  feed:[
    {
      _id: string,
      userId: string,
      profile: string,
      content: string,
      likeN: number,
      cmtN: number,
      pictures:[
        string
      ],
      date: string,
      weather: {
        status: number,
        temp: number
      }
      user: {
        userId: string,
        profile: string,
        sex: string,
        userName: string
      }
    }
  ]
}
```

태그한 피드 보기
-
```
GET/mypage/tagfeed
```

- Request
```

```
- Reponse
```
SUCCESS {
  feed:[
    {
      _id: string,
      userId: string,
      profile: string,
      content: string,
      likeN: number,
      cmtN: number,
      pictures:[
        string
      ],
      date: string,
      weather: {
        status: number,
        temp: number
      }
      user: {
        userId: string,
        profile: string,
        sex: string,
        userName: string
      }
    }
  ]
}
```

글작성
-
```
POST/post
```
- Request
```
{
  pictures:[
    string
  ],
  content: string,
  status: number,
  temp: number
}
```
- Reponse
```
SUCCESS {

} 
```

댓글 작성
-
```
POST/comment
```
- Request
```
{
  comment: string
  postId: string
}
```
- Reponse
```
SUCCESS {

} 
```