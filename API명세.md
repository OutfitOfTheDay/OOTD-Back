API명세
=

baseURL:  10.156.145.162:1212

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
    post:{
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
      userId: string
    }
    user:{
      userName: string,
      profile: string
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
    post:{
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
      userId: string
    }
    user:{
      userName: string,
      profile: string
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
    post:{
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
      userId: string
    }
    user:{
      userName: string,
      profile: string
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
    file
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
  text: string
  postId: string
}
```
- Reponse
```
SUCCESS {

} 
```

글 자세히 보기
-
```
GET/post/{postId}
```
- Request
```
{

}
```
- Reponse
```
SUCCESS {
  [{
    comment:{
      userId: string,
      date: string,
      _id: string,
      postId: string,
      text: string
    },
    user:{
      userName: String,
      profile: String
    }
  }]
} 
```