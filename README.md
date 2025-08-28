## For my love, Julia

A surprise website housing a collage of all our memories. For our two year anniversary.

This was my first personal project, and I was still quite unfamiliar with what I was doing at the time. I'm very happy with how it turned out, but it's not suitable for scaling.

All the data is stored in data.json, each entry with references to a folder of pictures and a folder of text that contain a picture and text file for each entry named exactly the same.
For example, I might have toronto.jpg and also toronto.txt. Then, the pictures in between each milestone marker are separate arrays, because I didn't know how to add the milestone markers
in between entries. Both of these examples illustrate how this website would be painful to scale.

Instead, I'm going to use a SQLite database to store all entries. I'll have to do some homework, but this will be a rewarding investment. Additionally, I want to make it easier to add future entries. To this end, I'm going to create an "add entry" page that is password protected so that only me and Julia can add entries.

Other fixes should be made too, perhaps regarding sizing photos appropriately. I think using TailwindCSS would also make this repo more maintainable. At least, coming from an Angular perspective, putting everything inside App.css is it's own kind of hell.

Time to get to work!

