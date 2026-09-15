const userController = require('../controllers/userController');
const feedController = require('../controllers/feedController');
const livestockController = require('../controllers/liveStockController');
const User = require('../models/userModel');
const Feed = require('../models/feedModel');
const Livestock = require('../models/liveStockModel');
const mongoose = require('mongoose');
const { validateToken } = require('../authUtils');

describe('User_Model_Test', () => {
  test('backend_usermodel_should_validate_a_user_with_all_required_fields', async () => {
    const validUserData = {
      userName: 'validUserName',
      email: 'validemail@gmail.com',
      mobile: '9876543212',
      password: 'validpassword',
      role: 'user'
    };

    const user = new User(validUserData);

    await expect(user.validate()).resolves.toBeUndefined();
  });

  test('backend_usermodel_should_validate_a_user_with_missing_username', async () => {
    const invalidUserData = {
      email: 'demouser@gmail.com',
      mobile: '9876543212',
      password: 'validpassword',
      role: 'user'
    };

    const user = new User(invalidUserData);

    await expect(user.validate()).rejects.toThrowError();
  });

  test('backend_usermodel_should_validate_a_user_with_missing_email', async () => {
    const invalidUserData = {
      userName: 'validUserName',
      mobile: '9876543212',
      password: 'validpassword',
      role: 'user'
    };

    const user = new User(invalidUserData);

    await expect(user.validate()).rejects.toThrowError();
  });

  test('backend_usermodel_should_validate_a_user_with_missing_mobile', async () => {
    const invalidUserData = {
      userName: 'validUserName',
      email: 'demouser@gmail.com',
      password: 'validpassword',
      role: 'user'
    };

    const user = new User(invalidUserData);

    await expect(user.validate()).rejects.toThrowError();
  });

  test('backend_usermodel_should_validate_a_user_with_missing_password', async () => {
    const invalidUserData = {
      userName: 'validUserName',
      email: 'demouser@gmail.com',
      mobile: '9876543212',
      role: 'user'
    };

    const user = new User(invalidUserData);

    await expect(user.validate()).rejects.toThrowError();
  });

  test('backend_usermodel_should_validate_a_user_with_missing_role', async () => {
    const invalidUserData = {
      userName: 'validUserName',
      email: 'demouser@gmail.com',
      mobile: '9876543212',
      password: 'validpassword',
    };

    const user = new User(invalidUserData);

    await expect(user.validate()).rejects.toThrowError();
  });
});
describe('Livestock_Model_Test', () => {
  test('backend_livestockmodel_should_validate_a_livestock_with_all_required_fields', async () => {
    const validLivestockData = {
      name: 'Cow',
      species: 'Cattle',
      age: 5,
      breed: 'Holstein',
      healthCondition: 'Healthy',
      location: 'Farm A',
      vaccinationStatus: 'Up to date',
      attachment: 'path/to/attachment.jpg',
      userId: new mongoose.Types.ObjectId(),
    };

    const livestock = new Livestock(validLivestockData);

    await expect(livestock.validate()).resolves.toBeUndefined();
  });

  test('backend_livestockmodel_should_validate_a_livestock_with_missing_name', async () => {
    const invalidLivestockData = {
      species: 'Cattle',
      age: 5,
      breed: 'Holstein',
      healthCondition: 'Healthy',
      location: 'Farm A',
      vaccinationStatus: 'Up to date',
      attachment: 'path/to/attachment.jpg',
      userId: new mongoose.Types.ObjectId(),
    };

    const livestock = new Livestock(invalidLivestockData);

    await expect(livestock.validate()).rejects.toThrowError();
  });

  test('backend_livestockmodel_should_validate_a_livestock_with_missing_species', async () => {
    const invalidLivestockData = {
      name: 'Cow',
      age: 5,
      breed: 'Holstein',
      healthCondition: 'Healthy',
      location: 'Farm A',
      vaccinationStatus: 'Up to date',
      attachment: 'path/to/attachment.jpg',
      userId: new mongoose.Types.ObjectId(),
    };

    const livestock = new Livestock(invalidLivestockData);

    await expect(livestock.validate()).rejects.toThrowError();
  });
});
describe('Feed_Model_Test', () => {
  test('backend_feedmodel_should_validate_a_feed_with_all_required_fields', async () => {
    const validFeedData = {
      feedName: 'Corn',
      type: 'Grain',
      description: 'High-quality corn for livestock feed',
      unit: 'kg',
      pricePerUnit: 12,
    };

    const feed = new Feed(validFeedData);

    await expect(feed.validate()).resolves.toBeUndefined();
  });

  test('backend_feedmodel_should_validate_a_feed_with_missing_feedName', async () => {
    const invalidFeedData = {
      type: 'Grain',
      description: 'High-quality corn for livestock feed',
      unit: 'kg',
      pricePerUnit: 12,
    };

    const feed = new Feed(invalidFeedData);

    await expect(feed.validate()).rejects.toThrowError();
  });

  test('backend_feedmodel_should_validate_a_feed_with_missing_type', async () => {
    const invalidFeedData = {
      feedName: 'Corn',
      description: 'High-quality corn for livestock feed',
      unit: 'kg',
      pricePerUnit: 12,
    };

    const feed = new Feed(invalidFeedData);

    await expect(feed.validate()).rejects.toThrowError();
  });
});
describe('getUserByEmailAndPassword_Test', () => {
  test('backend_getuserbyemailandpassword_in_usercontroller_should_return_200_status_code_when_user_found', async () => {
    const req = { 
      body: {   
        email: 'test@example.com',
        password: 'password123'
      } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const user = {
      userName: 'TestUser',
      role: 'user',
      _id: new mongoose.Types.ObjectId()
    };
    User.findOne = jest.fn().mockResolvedValue(user);

    await userController.getUserByEmailAndPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });
  
  test('backend_getuserbyemailandpassword_in_usercontroller_should_return_404_status_code_when_user_not_found', async () => {
    const req = { 
      body: {   
        email: 'nonexistent@example.com',
        password: 'password123'
      } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    User.findOne = jest.fn().mockResolvedValue(null);

    await userController.getUserByEmailAndPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
  });

  test('backend_getuserbyemailandpassword_in_usercontroller_should_return_500_status_code_when_internal_server_error_occurs', async () => {
    const req = { 
      body: {   
        email: 'test@example.com',
        password: 'password123'
      } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    User.findOne = jest.fn().mockRejectedValue(new Error('Internal Server Error'));

    await userController.getUserByEmailAndPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
  });
});
describe('addUser_Test', () => {
  test('backend_add_user_in_usercontroller_should_return_200_status_code_when_user_added_successfully', async () => {
    const req = { 
      body: {   
        userName: 'NewUser',
        email: 'newuser@example.com',
        password: 'password123',
        role: 'user',
        mobile:'9876543212'
      } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    User.create = jest.fn().mockResolvedValue(req.body);

    await userController.addUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('backend_add_user_in_usercontroller_should_return_500_status_code_when_internal_server_error_occurs', async () => {
    const req = { 
      body: {   
        userName: 'NewUser',
        email: 'newuser@example.com',
        password: 'password123',
        role: 'user',
        mobile:'9876544321'
      } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    User.create = jest.fn().mockRejectedValue(new Error('Internal Server Error'));

    await userController.addUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('forgotPassword_Test', () => {
  test('backend_forgot_password_in_usercontroller_should_return_200_status_code_when_password_reset_successful', async () => {
    const req = { 
      body: {   
        email: 'test@example.com',
        mobile: '1234567890',
        newPassword: 'newPassword123'
      } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const user = {
      email: 'test@example.com',
      mobile: '1234567890',
      password: 'oldPassword123',
      save: jest.fn().mockResolvedValue(true)
    };
    User.findOne = jest.fn().mockResolvedValue(user);

    await userController.forgotPassword(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ 
      email: 'test@example.com', 
      mobile: '1234567890' 
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Password reset successfully' });
  });
  
  test('backend_forgot_password_in_usercontroller_should_return_404_status_code_when_user_not_found', async () => {
    const req = { 
      body: {   
        email: 'nonexistent@example.com',
        mobile: '9999999999',
        newPassword: 'newPassword123'
      } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    User.findOne = jest.fn().mockResolvedValue(null);

    await userController.forgotPassword(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ 
      email: 'nonexistent@example.com', 
      mobile: '9999999999' 
    });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found or mobile number does not match' });
  });


  test('backend_forgot_password_in_usercontroller_should_return_500_status_code_when_internal_server_error_occurs', async () => {
    const req = { 
      body: {   
        email: 'test@example.com',
        mobile: '1234567890',
        newPassword: 'newPassword123'
      } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    User.findOne = jest.fn().mockRejectedValue(new Error('Database connection error'));

    await userController.forgotPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database connection error' });
  });

});
describe('feedController', () => {
  describe('getAllFeeds', () => {
    test('backend_getallfeeds_in_feedcontroller_should_return_all_feeds_and_respond_with_a_200_status_code', async () => {
      const feeds = [
        { _id: 'feed1', feedName: 'Feed 1', type: 'Type 1', description: 'Description 1', unit: 'kg', pricePerUnit: 10.5 },
        { _id: 'feed2', feedName: 'Feed 2', type: 'Type 2', description: 'Description 2', unit: 'kg', pricePerUnit: 12.0 },
      ];
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Feed.find = jest.fn().mockResolvedValue(feeds);

      await feedController.getAllFeeds(req, res);

      expect(Feed.find).toHaveBeenCalledWith({});
      expect(res.status).toHaveBeenCalledWith(200);
    });

    test('backend_getallfeeds_in_feedcontroller_should_handle_errors_and_respond_with_a_500_status_code_and_error_message', async () => {
      const error = new Error('Database error');
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Feed.find = jest.fn().mockRejectedValue(error);

      await feedController.getAllFeeds(req, res);

      expect(Feed.find).toHaveBeenCalledWith({});
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });

  describe('getFeedById', () => {
    test('backend_getfeedbyid_in_feedcontroller_should_return_a_feed_by_id_and_respond_with_a_200_status_code', async () => {
      const feed = { _id: 'feed1', feedName: 'Feed 1', type: 'Type 1', description: 'Description 1', unit: 'kg', pricePerUnit: 10.5 };
      const req = { params: { id: 'feed1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Feed.findById = jest.fn().mockResolvedValue(feed);

      await feedController.getFeedById(req, res);

      expect(Feed.findById).toHaveBeenCalledWith('feed1');
      expect(res.status).toHaveBeenCalledWith(200);
    });

    test('backend_getfeedsbyid_in_feedcontroller_should_handle_errors_and_respond_with_a_500_status_code_and_error_message', async () => {
      const error = new Error('Database error');
      const req = { params: { id: 'feed1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Feed.findById = jest.fn().mockRejectedValue(error);

      await feedController.getFeedById(req, res);

      expect(Feed.findById).toHaveBeenCalledWith('feed1');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });

    test('backend_getfeedsbyid_in_feedcontroller_should_handle_not_finding_a_feed_and_respond_with_a_404_status_code', async () => {
      const req = { params: { id: 'nonExistentFeed' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Feed.findById = jest.fn().mockResolvedValue(null);

      await feedController.getFeedById(req, res);

      expect(Feed.findById).toHaveBeenCalledWith('nonExistentFeed');
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('addFeed', () => {
    test('backend_addfeed_in_feedcontroller_should_add_a_feed_and_respond_with_a_200_status_code_and_a_success_message', async () => {
      const req = {
        body: {
          feedName: 'New Feed Name',
          type: 'New Type',
          description: 'New Description',
          unit: 'kg',
          pricePerUnit: 15.5,
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Feed.create = jest.fn().mockResolvedValue(req.body);

      await feedController.addFeed(req, res);

      expect(Feed.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Feed Added Successfully' });
    });

    test('backend_addfeed_in_feedcontroller_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
      const error = new Error('Database error');
      const req = {
        body: {
          feedName: 'New Feed Name',
          type: 'New Type',
          description: 'New Description',
          unit: 'kg',
          pricePerUnit: 15.5,
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Feed.create = jest.fn().mockRejectedValue(error);

      await feedController.addFeed(req, res);

      expect(Feed.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });

});
describe('livestockController', () => {
  describe('getAllLivestock', () => {
    test('backend_getalllivestock_in_livestockcontroller_should_return_all_livestock_and_respond_with_a_200_status_code', async () => {
      const livestock = [
        { _id: 'livestock1', name: 'Cow', species: 'Bovine', age: 3, breed: 'Holstein', healthCondition: 'Good', location: 'Farm 1', vaccinationStatus: 'Up-to-date' },
        { _id: 'livestock2', name: 'Sheep', species: 'Ovine', age: 2, breed: 'Merino', healthCondition: 'Good', location: 'Farm 2', vaccinationStatus: 'Up-to-date' },
      ];
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Livestock.find = jest.fn().mockResolvedValue(livestock);

      await livestockController.getAllLivestock(req, res);

      expect(Livestock.find).toHaveBeenCalledWith({});
      expect(res.status).toHaveBeenCalledWith(200);
    });

    test('backend_getalllivestock_in_livestockcontroller_should_handle_errors_and_respond_with_a_500_status_code_and_error_message', async () => {
      const error = new Error('Database error');
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Livestock.find = jest.fn().mockRejectedValue(error);

      await livestockController.getAllLivestock(req, res);

      expect(Livestock.find).toHaveBeenCalledWith({});
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });

  describe('getLivestockById', () => {
    test('backend_getlivestockbyid_in_livestockcontroller_should_return_livestock_by_id_and_respond_with_a_200_status_code', async () => {
      const livestock = { _id: 'livestock1', name: 'Cow', species: 'Bovine', age: 3, breed: 'Holstein', healthCondition: 'Good', location: 'Farm 1', vaccinationStatus: 'Up-to-date' };
      const req = { params: { id: 'livestock1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Livestock.findById = jest.fn().mockResolvedValue(livestock);

      await livestockController.getLivestockById(req, res);

      expect(Livestock.findById).toHaveBeenCalledWith('livestock1');
      expect(res.status).toHaveBeenCalledWith(200);
    });

    test('backend_getlivestockbyid_in_livestockcontroller_should_handle_errors_and_respond_with_a_500_status_code_and_error_message', async () => {
      const error = new Error('Database error');
      const req = { params: { id: 'livestock1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Livestock.findById = jest.fn().mockRejectedValue(error);

      await livestockController.getLivestockById(req, res);

      expect(Livestock.findById).toHaveBeenCalledWith('livestock1');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });

    test('backend_getlivestockbyid_in_livestockcontroller_should_handle_not_finding_livestock_and_respond_with_a_404_status_code', async () => {
      const req = { params: { id: 'nonExistentLivestock' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Livestock.findById = jest.fn().mockResolvedValue(null);

      await livestockController.getLivestockById(req, res);

      expect(Livestock.findById).toHaveBeenCalledWith('nonExistentLivestock');
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('addLivestock', () => {
    test('backend_addlivestock_in_livestockcontroller_should_add_livestock_and_respond_with_a_200_status_code_and_a_success_message', async () => {
      const req = {
        body: {
          name: 'New Livestock Name',
          species: 'New Species',
          age: 2,
          breed: 'New Breed',
          healthCondition: 'Good',
          location: 'New Location',
          vaccinationStatus: 'Up-to-date',
          userId: 'user1',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Livestock.create = jest.fn().mockResolvedValue(req.body);

      await livestockController.addLivestock(req, res);

      expect(Livestock.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Livestock Added Successfully' });
    });

    test('backend_addlivestock_in_livestockcontroller_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
      const error = new Error('Database error');
      const req = {
        body: {
          name: 'New Livestock Name',
          species: 'New Species',
          age: 2,
          breed: 'New Breed',
          healthCondition: 'Good',
          location: 'New Location',
          vaccinationStatus: 'Up-to-date',
          userId: 'user1',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Livestock.create = jest.fn().mockRejectedValue(error);

      await livestockController.addLivestock(req, res);

      expect(Livestock.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });

  describe('deleteLivestock', () => {
    test('backend_deletelivestock_in_livestockcontroller_should_delete_livestock_and_respond_with_a_200_status_code_and_a_success_message', async () => {
      const livestockId = 'livestock1';
      const req = {
        params: { id: livestockId },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Livestock.findByIdAndDelete = jest.fn().mockResolvedValue({ _id: livestockId });

      await livestockController.deleteLivestock(req, res);

      expect(Livestock.findByIdAndDelete).toHaveBeenCalledWith(livestockId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Livestock Deleted Successfully' });
    });

    test('backend_deletelivestock_in_livestockcontroller_should_handle_not_finding_livestock_and_respond_with_a_404_status_code', async () => {
      const livestockId = 'nonExistentLivestock';
      const req = {
        params: { id: livestockId },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Livestock.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      await livestockController.deleteLivestock(req, res);

      expect(Livestock.findByIdAndDelete).toHaveBeenCalledWith(livestockId);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    test('backend_deletelivestock_in_livestockcontroller_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
      const livestockId = 'livestock1';
      const error = new Error('Database error');
      const req = {
        params: { id: livestockId },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Livestock.findByIdAndDelete = jest.fn().mockRejectedValue(error);

      await livestockController.deleteLivestock(req, res);

      expect(Livestock.findByIdAndDelete).toHaveBeenCalledWith(livestockId);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });


});
describe('validateToken', () => {
 
  test('backend_validatetoken_function_in_authutils_should_respond_with_400_status_for_invalidtoken', () => {
    // Mock the req, res, and next objects
    const req = {
      header: jest.fn().mockReturnValue('invalidToken'),
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    // Call the validateToken function
    validateToken(req, res, next);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('backend_validatetoken_function_in_authutils_should_respond_with_400_status_for_no_token', () => {
    // Mock the req, res, and next objects
    const req = {
      header: jest.fn().mockReturnValue(null),
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    // Call the validateToken function
    validateToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});