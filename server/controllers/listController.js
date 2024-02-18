import myListModel from "../models/list.js";

async function GetMyList(req, res) {
  const id = req.params.id;
  console.log("getMyLIst function initiated");
  try {
    const userLists = await myListModel.find({ userId: id });
    res.send(userLists);
  } catch (error) {
    res.status(500).send(`Internal Error ${error}`);
  }
}

async function CreateList(req, res) {
  try {
    const id = req.params.id;
    const movieData = req.body.myListData;

    // Check if the user already has a list
    const existingList = await myListModel.findOne({ userId: id });

    if (existingList) {
      // If the user already has a list, update the movieData array
      existingList.Data = existingList.Data || [];

      // Check if the movie is not already in the list
      const isDuplicate = existingList.Data.some(
        (existingMovie) => existingMovie.id === movieData.movieData.id
      );

      if (!isDuplicate) {
        existingList.Data.push(movieData.movieData);
        await existingList.save();
        return res.status(201).send("List data updated");
      } else {
        return res.send("Movie already exists in the list");
      }
    }

    // If it doesn't exist, create a new entry with the movieData array
    const result = await myListModel.create({
      Data: [movieData.movieData],
      userId: id,
    });

    res.status(201).send("List data appended");
  } catch (error) {
    console.error("Error updating/appending data into myList", error);
    res.status(500).send(`Internal Error updating/appending my list ${error}`);
  }
}

export { GetMyList, CreateList };
