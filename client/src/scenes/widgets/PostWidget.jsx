import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  ShareOutLined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import state, { setPost } from "state";

const PostWidget = ({ item }) => {
  const {
    postId: _id,
    postUserId: userId,
    firstName,
    lastName,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
  } = item;
  const [isComments, setIsComments] = useState(false);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${item._id}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };
  return (
    <WidgetWrapper m="2rem 0rem">
      
      <Friend
        friendId={item.userId}
        name={`${firstName} ${lastName}`}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height={"auto"}
          alt="post"
          style={{
            borderRadius: "0.75rem",
            marginTop: "0.75rem",
          }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween m="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap={"0.3rem"}>
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => {
            return (
              <Box key={`${firstName} ${lastName}-${i}`}>
                <Divider />
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                  {comment}
                </Typography>
                <Divider />
              </Box>
            );
          })}
        </Box>
      )}
    </WidgetWrapper>
  );
};
export default PostWidget;
