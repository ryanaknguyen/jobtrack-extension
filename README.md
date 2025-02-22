# JobTrack Chrome Extension

This repo serves as the source code for JobTrack, a chrome extension created by Ryan Nguyen aimed for those seeking employment to track and save job postings that they are interested in.

The purpose of JobTrack is to make it easier to keep job postings in one place rather than having multiple different tabs open, which makes it more difficult for the user to find what they need. There may be instances where a user finds a job posting and wants to fill out their applications later on, possibly finding more job postings and/or doing other tasks in the meantime. This makes JobTrack a useful tool to have for managing multiple job applications and motivates the user to get them done.

## Features

- JobTrack uses the Chrome Web API to save the link of the job posting currently being viewed and associate it with a job description that the user types in (ex. Company - Job Title).

- Since each job description is associated with a link that JobTrack grabs based on the current active tab when saved, users can click on a description to jump to its respective linked job posting.

- Users can check off job postings that they have completed applications for, updating JobTrack's daily job application counter that resets every day.

- Users also have the option to clear the entire saved job postings list for increased efficiency, rather than manually having to select each job posting one-by-one.