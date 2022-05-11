const db = require("./db");
const { User, Project, Task, User_Project, Status } = require("./models");


async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");


  await Status.create({
    name: "open"
  })

  await Status.create({
    name: "in progress"
  })

  await Status.create({
    name: "in review"
  })

  await Status.create({
    name: "done"
  })

  /*

  // new Date().toISOString()
  const projectOne = await Project.create({
    createdBy: shaahid.id,
    title: "Test",
    description: "Test",
    endDate: "8/3/2022",
    priority: "high",
    status: "Completed",
    progress: 100,
    favorite: true

  })

  await shaahid.addProject(projectOne)
  console.log(shaahid)

  const status = await Status.create({
    projectId: projectOne.id,
    name: "done"
  })

  const task1 = await Task.create({
    statusId: status.id,
    projectId: projectOne.id,
    type: "Bug",
    content: "ABC",
    userId: shaahid.id
  })





  */








  /*
  const thomas = await User.create({
    username: "thomas",
    email: "thomas@email.com",
    password: "123456",
    photoUrl:
      "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914467/messenger/thomas_kwzerk.png",
  });

  const santiago = await User.create({
    username: "santiago",
    email: "santiago@email.com",
    password: "123456",
    photoUrl:
      "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914466/messenger/775db5e79c5294846949f1f55059b53317f51e30_s3back.png",
  });



  const otherUsers = await Promise.all([
    ,
    User.create({
      username: "ashanti",
      email: "ashanti@email.com",
      password: "123456",
      photoUrl:
        "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914466/messenger/68f55f7799df6c8078a874cfe0a61a5e6e9e1687_e3kxp2.png",
    }),
    User.create({
      username: "julia",

      email: "julia@email.com",
      password: "123456",
      photoUrl:
        "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914468/messenger/d9fc84a0d1d545d77e78aaad39c20c11d3355074_ed5gvz.png",
    }),
    User.create({
      username: "cheng",
      email: "cheng@email.com",
      password: "123456",
      photoUrl:
        "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914466/messenger/9e2972c07afac45a8b03f5be3d0a796abe2e566e_ttq23y.png",
    }),
  ]);

  console.log(`seeded users and messages`);
  */
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}
