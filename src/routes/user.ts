import express from 'express';

const userRouter = express.Router();

const placeholder = (): null => {
    return null;
};

userRouter.post('/test', placeholder);
userRouter.post('/createtestuser', placeholder);
userRouter.post('/create', placeholder); // ?un=username&pw=password
userRouter.post('/find', placeholder); // ?un=username

export default userRouter;
