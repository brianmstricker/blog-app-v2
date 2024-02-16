import CreateTweetBox from "../Home/HomeTweetBox/CreateTweetBox";

const PostReply = ({
 userImage,
 replyTweetUsername,
 replyTweetId,
}: {
 userImage: string | null | undefined;
 replyTweetUsername: string | null | undefined;
 replyTweetId: string | null | undefined;
}) => {
 return (
  <CreateTweetBox
   replyPage
   userImage={userImage}
   replyTweetUsername={replyTweetUsername}
   replyTweetId={replyTweetId}
  />
 );
};
export default PostReply;
