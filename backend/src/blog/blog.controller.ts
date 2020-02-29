import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';

@Controller('blog')
export class BlogController {
    
    constructor(private blogService: BlogService) { }

    @Post('/post')
    async addPost(@Res() res, @Body() createPostDTO: CreatePostDTO) {
        const newPost = await this.blogService.addPost(createPostDTO);
        return res.status(HttpStatus.OK).json({
            message: "Post has been submitted successfully!",
            post: newPost,
        })
    }

    @Get('post/:postID')
    async getPost(@Res() res, @Param('postId', new ValidateObjectId()) postID) {
        const post = await this.blogService.getPost(postID);
        if (!post) {
            throw new NotFoundException("Post not found");
        }
        return res.status(HttpStatus.OK).json(post);
    }

    @Get('posts')
    async getPosts(@Res() res){
        const posts = await this.blogService.getPosts();
        if (!posts || posts.length < 1){
            throw new NotFoundException("There are no blog posts.")
        }
        return res.status(HttpStatus.OK).json(posts)
    }

    @Put('/edit')
    async editPost(
        @Res() res,
        @Query('postID', new ValidateObjectId()) postID,
        @Body() createPostDTO: CreatePostDTO
    ) {
        const editedPost = await this.blogService.editPost(postID, createPostDTO);
        if(!editedPost){
            throw new NotFoundException("Post does not exist.")
        }
        return res.status(HttpStatus.OK).json({
            message: "Post updated.",
            post: editedPost
        })
    }

    @Delete('/delete')
    async deletePost(@Res() res, @Query('postID', new ValidateObjectId()) postID) {
        const deletedPost = await this.blogService.deletePost(postID);
        if (!deletedPost) {
            throw new NotFoundException('Post does not exist!');
        }
        return res.status(HttpStatus.OK).json({
        message: 'Post has been deleted!',
        post: deletedPost,
        });
    }
}
