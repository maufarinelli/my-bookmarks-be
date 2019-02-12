import express from 'express';
import BookMark from '../../models/bookmarks';
import { IBookmark } from '../../models/interfaces';

export const addBookmark = (req: express.Request, res: express.Response) => {
  const { url, category } = req.body;

  BookMark.create({ url, category })
    .then((bookmark: IBookmark) => {
      const { url, category } = bookmark.dataValues;

      res.status(200).json({
        message: 'Bookmark successfuly registered',
        url,
        category
      });
    })
    .catch((error: Error) => {
      console.log('Error : ', error);
      res.status(400).json({ message: 'Error: something wrong happened trying to signup. Please try it again.' });
    });
};

export const getBookmarks = (req: express.Request, res: express.Response) => {
  const where = { ...req.query };

  BookMark.findAll({ where })
    .then((results: IBookmark[]) => {
      res.status(200).json([...results]);
    })
    .catch((error: Error) => {
      console.log('get bookmarks error: ', error);
      res.status(400).json({ message: 'Error: something wrong in your search. Please try it again.' });
    });
};

export const deleteBookmark = (req: express.Request, res: express.Response) => {
  const { id } = req.body;

  BookMark.findById(parseInt(id, 10))
    .then(bookmark => {
      if (bookmark) {
        bookmark.destroy().then(() => {
          res.status(200).json({ message: 'Bookmark successfuly deleted' });
        });
      }
    })
    .catch((error: Error) => {
      console.log('delete bookmarks error: ', error);
      res.status(400).json({ message: 'Error: something wrong trying to delete a bookmark. Please try it again.' });
    });
};
