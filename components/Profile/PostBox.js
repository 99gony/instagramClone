import React from 'react';
import { HeartFilled } from '@ant-design/icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { backendServer } from '../../actions/user';
import Link from 'next/link';
import {useRouter} from 'next/router';

const PostBox = ({p}) =>{
  const router = useRouter();
  const params = router.query.profile || 'hashtag';

  return(
    <div>
      {p.Images.length !== 0 ? 
      <img src={`${backendServer}/${p.Images[0].url}`} />
      :<span>{p.content}</span>}
      <Link
        href={params === 'hashtag'?
        {
          pathname: `/${params}/${router.query.title}`,
          query: { postId : p.id},
        }
        :
        {
          pathname: `/${params}`,
          query: { postId : p.id},
        }}
        scroll={false}
        shallow={true}
        
      ><a className="whenHover">
        <div>
          <HeartFilled />
          <span>
            {p.Liker.length}
          </span>
        </div>
        <div>
          <FontAwesomeIcon icon={faComment} />
          <span>
            {p.Comments.length}
          </span>
        </div>
      </a></Link>
    </div>
  )
}

export default PostBox;