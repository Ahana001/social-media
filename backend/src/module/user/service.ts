import {getPostsByUserId} from '../post/service';
import {User} from './models';
import {UserDetails, UserDocument} from './type';

export async function getAllUserFromDB() {
  /*retrieve all users */
  const users: UserDocument[] = await User.find({is_deleted: false});

  const modified_users_result = await users.reduce(
    /* eslint-disable @typescript-eslint/no-explicit-any */
    async (accumulator: Promise<UserDocument[]>, user: any) => {
      const modified_parent_user = user.toObject();
      delete modified_parent_user.password;
      delete modified_parent_user._id;
      delete modified_parent_user.image_public_id;

      if (modified_parent_user.followers.length) {
        const followers_details = await User.find({
          id: {$in: modified_parent_user.followers},
          is_deleted: false,
        });
        modified_parent_user.followers = await followers_details.reduce(
          /* eslint-disable @typescript-eslint/no-explicit-any */
          async (followers_accumulator: Promise<UserDocument[]>, user: any) => {
            const modified_child_user = user.toObject();
            delete modified_child_user.password;
            delete modified_child_user._id;
            delete modified_child_user.image_public_id;

            if (modified_child_user.followers.length) {
              const child_followers_details = await User.find({
                id: {$in: modified_child_user.followers},
                is_deleted: false,
              });
              modified_child_user.followers =
                await child_followers_details.reduce(
                  /* eslint-disable @typescript-eslint/no-explicit-any */
                  async (
                    child_followers_accumulator: Promise<UserDocument[]>,
                    child_user: any
                  ) => {
                    const modified_child = child_user.toObject();
                    delete modified_child.password;
                    delete modified_child._id;
                    delete modified_child_user.image_public_id;

                    const accumulator = await child_followers_accumulator;
                    accumulator.push(modified_child);
                    return accumulator;
                  },
                  Promise.resolve([])
                );
            }
            if (modified_child_user.following.length) {
              const child_following_details = await User.find({
                id: {$in: modified_child_user.following},
                is_deleted: false,
              });
              modified_child_user.following =
                await child_following_details.reduce(
                  /* eslint-disable @typescript-eslint/no-explicit-any */
                  async (
                    child_following_accumulator: Promise<UserDocument[]>,
                    child_user: any
                  ) => {
                    const modified_child = child_user.toObject();
                    delete modified_child.password;
                    delete modified_child._id;
                    delete modified_child.image_public_id;

                    const accumulator = await child_following_accumulator;
                    accumulator.push(modified_child);
                    return accumulator;
                  },
                  Promise.resolve([])
                );
            }

            const accumulator = await followers_accumulator;
            accumulator.push(modified_child_user);
            return accumulator;
          },
          Promise.resolve([])
        );
      }

      if (modified_parent_user.following.length) {
        const following_details = await User.find({
          id: {$in: modified_parent_user.following},
          is_deleted: false,
        });
        modified_parent_user.following = await following_details.reduce(
          /* eslint-disable @typescript-eslint/no-explicit-any */
          async (followers_accumulator: Promise<UserDocument[]>, user: any) => {
            const modified_child_user = user.toObject();
            delete modified_child_user.password;
            delete modified_child_user._id;
            delete modified_child_user.image_public_id;

            if (modified_child_user.followers.length) {
              const child_followers_details = await User.find({
                id: {$in: modified_child_user.followers},
              });
              modified_child_user.followers =
                await child_followers_details.reduce(
                  /* eslint-disable @typescript-eslint/no-explicit-any */
                  async (
                    child_followers_accumulator: Promise<UserDocument[]>,
                    child_user: any
                  ) => {
                    const modified_child = child_user.toObject();
                    delete modified_child.password;
                    delete modified_child._id;
                    delete modified_child.image_public_id;

                    const accumulator = await child_followers_accumulator;
                    accumulator.push(modified_child);
                    return accumulator;
                  },
                  Promise.resolve([])
                );
            }
            if (modified_child_user.following.length) {
              const child_following_details = await User.find({
                id: {$in: modified_child_user.following},
                is_deleted: false,
              });
              modified_child_user.following =
                await child_following_details.reduce(
                  /* eslint-disable @typescript-eslint/no-explicit-any */
                  async (
                    child_following_accumulator: Promise<UserDocument[]>,
                    child_user: any
                  ) => {
                    const modified_child = child_user.toObject();
                    delete modified_child.password;
                    delete modified_child._id;
                    delete modified_child.image_public_id;

                    const accumulator = await child_following_accumulator;
                    accumulator.push(modified_child);
                    return accumulator;
                  },
                  Promise.resolve([])
                );
            }
            const accumulator = await followers_accumulator;
            accumulator.push(modified_child_user);
            return accumulator;
          },
          Promise.resolve([])
        );
      }

      const acc = await accumulator;
      acc.push(modified_parent_user);
      return accumulator;
    },
    Promise.resolve([])
  );
  return modified_users_result;
}

export async function getUsersFromDB(
  user_ids: string[]
): Promise<UserDocument[]> {
  /*retrieve all users */
  const users: UserDocument[] = await User.find({
    is_deleted: false,
    id: {$in: user_ids},
  });

  const modified_users_result = await users.reduce(
    /* eslint-disable @typescript-eslint/no-explicit-any */
    async (accumulator: Promise<UserDocument[]>, user: any) => {
      const modified_parent_user = user.toObject();
      delete modified_parent_user.password;
      delete modified_parent_user._id;
      delete modified_parent_user.image_public_id;

      if (modified_parent_user.followers.length) {
        const followers_details = await User.find({
          id: {$in: modified_parent_user.followers},
          is_deleted: false,
        });
        modified_parent_user.followers = await followers_details.reduce(
          /* eslint-disable @typescript-eslint/no-explicit-any */
          async (followers_accumulator: Promise<UserDocument[]>, user: any) => {
            const modified_child_user = user.toObject();
            delete modified_child_user.password;
            delete modified_child_user._id;
            delete modified_child_user.image_public_id;

            if (modified_child_user.followers.length) {
              const child_followers_details = await User.find({
                id: {$in: modified_child_user.followers},
                is_deleted: false,
              });
              modified_child_user.followers =
                await child_followers_details.reduce(
                  /* eslint-disable @typescript-eslint/no-explicit-any */
                  async (
                    child_followers_accumulator: Promise<UserDocument[]>,
                    child_user: any
                  ) => {
                    const modified_child = child_user.toObject();
                    delete modified_child.password;
                    delete modified_child._id;
                    delete modified_child.image_public_id;

                    const accumulator = await child_followers_accumulator;
                    accumulator.push(modified_child);
                    return accumulator;
                  },
                  Promise.resolve([])
                );
            }
            if (modified_child_user.following.length) {
              const child_following_details = await User.find({
                id: {$in: modified_child_user.following},
                is_deleted: false,
              });
              modified_child_user.following =
                await child_following_details.reduce(
                  /* eslint-disable @typescript-eslint/no-explicit-any */
                  async (
                    child_following_accumulator: Promise<UserDocument[]>,
                    child_user: any
                  ) => {
                    const modified_child = child_user.toObject();
                    delete modified_child.password;
                    delete modified_child._id;
                    delete modified_child.image_public_id;

                    const accumulator = await child_following_accumulator;
                    accumulator.push(modified_child);
                    return accumulator;
                  },
                  Promise.resolve([])
                );
            }

            const accumulator = await followers_accumulator;
            accumulator.push(modified_child_user);
            return accumulator;
          },
          Promise.resolve([])
        );
      }

      if (modified_parent_user.following.length) {
        const following_details = await User.find({
          id: {$in: modified_parent_user.following},
          is_deleted: false,
        });
        modified_parent_user.following = await following_details.reduce(
          /* eslint-disable @typescript-eslint/no-explicit-any */
          async (followers_accumulator: Promise<UserDocument[]>, user: any) => {
            const modified_child_user = user.toObject();
            delete modified_child_user.password;
            delete modified_child_user._id;
            delete modified_child_user.image_public_id;

            if (modified_child_user.followers.length) {
              const child_followers_details = await User.find({
                id: {$in: modified_child_user.followers},
              });
              modified_child_user.followers =
                await child_followers_details.reduce(
                  /* eslint-disable @typescript-eslint/no-explicit-any */
                  async (
                    child_followers_accumulator: Promise<UserDocument[]>,
                    child_user: any
                  ) => {
                    const modified_child = child_user.toObject();
                    delete modified_child.password;
                    delete modified_child._id;
                    delete modified_child.image_public_id;

                    const accumulator = await child_followers_accumulator;
                    accumulator.push(modified_child);
                    return accumulator;
                  },
                  Promise.resolve([])
                );
            }
            if (modified_child_user.following.length) {
              const child_following_details = await User.find({
                id: {$in: modified_child_user.following},
                is_deleted: false,
              });
              modified_child_user.following =
                await child_following_details.reduce(
                  /* eslint-disable @typescript-eslint/no-explicit-any */
                  async (
                    child_following_accumulator: Promise<UserDocument[]>,
                    child_user: any
                  ) => {
                    const modified_child = child_user.toObject();
                    delete modified_child.password;
                    delete modified_child._id;
                    delete modified_child.image_public_id;

                    const accumulator = await child_following_accumulator;
                    accumulator.push(modified_child);
                    return accumulator;
                  },
                  Promise.resolve([])
                );
            }
            const accumulator = await followers_accumulator;
            accumulator.push(modified_child_user);
            return accumulator;
          },
          Promise.resolve([])
        );
      }

      const acc = await accumulator;
      acc.push(modified_parent_user);
      return accumulator;
    },
    Promise.resolve([])
  );
  return modified_users_result;
}

export async function getUserSuggetionList(user_id: string) {
  const user = await User.findOne({id: user_id, is_deleted: false});

  const modified_user = (await user!.toObject()) as UserDetails;
  delete modified_user.password;
  delete modified_user._id;
  delete modified_user.image_public_id;

  modified_user.followers = await getUsersFromDB(user!.followers);
  modified_user.following = await getUsersFromDB(user!.following);

  const userPosts = await getPostsByUserId([user_id]);

  let suggetionList: UserDocument[] = [];
  userPosts.map(post => {
    post.liked_by.map(likedByUser => {
      if (
        (modified_user.following.find(
          followingUser => followingUser.id === likedByUser.id
        )
          ? false
          : true) &&
        likedByUser.id !== user_id
      ) {
        suggetionList.push(likedByUser);
      }
    });
    post.bookmark_by.map(bookMarkByUser => {
      if (
        (modified_user.following.find(
          followingUser => followingUser.id === bookMarkByUser.id
        )
          ? false
          : true) &&
        bookMarkByUser.id !== user_id
      ) {
        suggetionList.push(bookMarkByUser);
      }
    });
  });
  false;
  if (suggetionList.length === 0) {
    const allUser = await getAllUserFromDB();
    suggetionList = allUser.filter(
      user =>
        user.id !== user_id &&
        (modified_user.following.find(
          followingUser => followingUser.id === user.id
        )
          ? false
          : true)
    );
  }
  return suggetionList;
}
