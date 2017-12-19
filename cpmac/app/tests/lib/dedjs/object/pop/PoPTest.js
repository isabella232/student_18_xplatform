const ChaiAsPromised = require("chai-as-promised");
chai.use(ChaiAsPromised);
chai.should();

const FilesPath = require("../../../../../shared/res/files/files-path");
const FileIO = require("../../../../../shared/lib/file-io/file-io");
const Convert = require("../../../../../shared/lib/dedjs/Convert");
const CothorityMessages = require("../../../../../shared/lib/dedjs/protobuf/build/cothority-messages");

const PoP = require("../../../../../shared/lib/dedjs/object/pop/PoP").get;

const ROSTER_ID = "8yc0TaIweWRyMA==";
const ROSTER_ID_BYTE_ARRAY = Convert.base64ToByteArray(ROSTER_ID);
const ROSTER_LIST = [
  {
    "public": "HkDzpR5Imd7WNx8kl2lJcIVRVn8gfDByJnmlfrYh/zU=",
    "id": "z6kCTQ77Xna9yfgKka5lNQ==",
    "address": "tcp://10.0.2.2:7002",
    "description": "Conode_1"
  },
  {
    "public": "Fx6zzvJM6VzxfByLY2+uArGPtd2lHKPVmoXGMhdaFCA=",
    "id": "Qd8XkrUlVEeClO9I95nklQ==",
    "address": "tcp://10.0.2.2:7004",
    "description": "Conode_2"
  },
  {
    "public": "j53MMKZNdtLlglcK9Ct1YYtkbbEOfq3R8ZoJOFIu6tE=",
    "id": "tUq+0651WRaAI4aTQC0d8w==",
    "address": "tcp://10.0.2.2:7006",
    "description": "Conode_3"
  }
];
const ROSTER_LIST_SERVER_IDENTITIES = ROSTER_LIST.map(conode => {
  conode.public = Convert.base64ToByteArray(conode.public);
  conode.id = Convert.base64ToByteArray(conode.id);

  return Convert.toServerIdentity(conode.address, conode.public, conode.description, conode.id);
});
const ROSTER_AGGREGATE = "q+G+7n6FXsY7hpxK3m119GuDHnchS6wqTE0sZE/fOKg=";
const ROSTER_AGGREGATE_BYTE_ARRAY = Convert.base64ToByteArray(ROSTER_AGGREGATE);

const POP_DESC_NAME = "Ced's Gang";
const POP_DESC_DATETIME = "Thu, 30 Nov 2017 11:12:00 GMT";
const POP_DESC_LOCATION = "INM, Lausanne";
const POP_DESC_ROSTER = CothorityMessages.createRoster(ROSTER_ID_BYTE_ARRAY, ROSTER_LIST_SERVER_IDENTITIES, ROSTER_AGGREGATE_BYTE_ARRAY);

const FINAL_POP_DESC = CothorityMessages.createPopDesc(POP_DESC_NAME, POP_DESC_DATETIME, POP_DESC_LOCATION, POP_DESC_ROSTER);
let FINAL_ATTENDEES = ["HkDzpR5Imd7WNx8kl2lJcIVRVn8gfDByJnmlfrYh/zU=", "Fx6zzvJM6VzxfByLY2+uArGPtd2lHKPVmoXGMhdaFCA=", "j53MMKZNdtLlglcK9Ct1YYtkbbEOfq3R8ZoJOFIu6tE="];
FINAL_ATTENDEES = FINAL_ATTENDEES.map(base64Key => {
  return Convert.base64ToByteArray(base64Key);
});
const FINAL_SIGNATURE = Convert.base64ToByteArray("2lHKPVm8gfDBhpxK3m119Gux6zzvJM6VzE0s3MMKZNd=");
const FINAL_MERGED = false;
const FINAL_STATEMENT = CothorityMessages.createFinalStatement(FINAL_POP_DESC, FINAL_ATTENDEES, FINAL_SIGNATURE, FINAL_MERGED);

const PRIVATE_KEY = "AWKlOlcTuCHEV/fKX0X1IoAoBU0n1c5iKp/SWRLj3T4=";
const PRIVATE_KEY_BYTE_ARRAY = Convert.base64ToByteArray(PRIVATE_KEY);
const PUBLIC_KEY = "y4JMDWrle6RMV+0BKU92Xbu8+J8VkZ5kV3SvSr2ZxHw=";
const PUBLIC_KEY_BYTE_ARRAY = Convert.base64ToByteArray(PUBLIC_KEY);
const PUBLIC_COMPLETE_KEY = "BBmiuL/uxUuItsuFVQJT4oUv4qZrb1fYQ+GL/ZTpZ43MfMSZvUqvdFdknpEVn/i8u112TykB7VdMpHvlag1Mgss=";
const PUBLIC_COMPLETE_KEY_BYTE_ARRAY = Convert.base64ToByteArray(PUBLIC_COMPLETE_KEY);
const JSON_KEY_PAIR = JSON.stringify({
  "private": PRIVATE_KEY,
  "public": PUBLIC_KEY,
  "publicComplete": PUBLIC_COMPLETE_KEY
});
const KEY_PAIR = Convert.parseJsonKeyPair(JSON_KEY_PAIR);

const POP_TOKEN = CothorityMessages.createPopToken(FINAL_STATEMENT, KEY_PAIR.private, KEY_PAIR.public);

describe.only("PoP", function () {

  function clean() {
    const promises = Object.getOwnPropertyNames(FilesPath).map(filePath => {
      return FileIO.writeStringTo(filePath, "");
    });

    promises.push(PoP.reset());

    return Promise.all(promises)
      .catch(error => {
        console.log(error);
        console.dir(error);
        console.trace();

        return Promise.reject(error);
      });
  }

  before("Clean Files Before Starting", function () {
    return clean();
  });

  after("Clean Files After Testing", function () {
    return clean();
  });

  beforeEach("Clean Files Before Each Test", function () {
    return clean();
  });

  afterEach("Clean Files After Each Test", function () {
    return clean();
  });

  it("should be a singleton", function () {
    const PoP2 = require("../../../../../shared/lib/dedjs/object/pop/PoP").get;

    (PoP2 === PoP).should.be.true;
  });

  it("should correctly load empty final statements array", function () {
  });

  it("should correctly load final statements", function () {
  });

  it("should correctly load empty PoP-Token array", function () {
  });

  it("should correctly load PoP-Token", function () {
  });

  it("should correctly reset files and memory", function () {
    return FileIO.writeStringTo(FilesPath.POP_FINAL_STATEMENTS, "POP_FINAL_STATEMENTS")
      .then(() => {
        return FileIO.writeStringTo(FilesPath.POP_TOKEN, "POP_TOKEN");
      })
      .then(() => {
        for (let i = 0; i < 100; ++i) {
          PoP._finalStatements.array.push(i);
          PoP._popToken.array.push(i);
        }

        return PoP.reset();
      })
      .then(() => {
        return FileIO.getStringOf(FilesPath.POP_FINAL_STATEMENTS)
          .then(finalStatementsString => {
            finalStatementsString.should.equal("");
          });
      })
      .then(() => {
        return FileIO.getStringOf(FilesPath.POP_TOKEN)
          .then(popTokenString => {
            popTokenString.should.equal("");
          });
      })
      .then(() => {
        PoP._finalStatements.array.length.should.equal(0);
        PoP._popToken.array.length.should.equal(0);
      });
  });

  describe("#isLoaded", function () {
    it("should return the reference to the boolean", function () {
      (PoP.isLoaded() === PoP._isLoaded).should.be.true;
    });
  });

  describe("#getFinalStatements", function () {
    it("should return the reference to the final statements observable array", function () {
      (PoP.getFinalStatements() === PoP._finalStatements.array).should.be.true;
    });
  });

  describe("#getFinalStatementsModule", function () {
    it("should return the reference to the final statements observable module", function () {
      (PoP.getFinalStatementsModule() === PoP._finalStatements).should.be.true;
    });
  });

  describe("#getPopToken", function () {
    it("should return the reference to the PoP-Token observable array", function () {
      (PoP.getPopToken() === PoP._popToken.array).should.be.true;
    });
  });

  describe("#getPopTokenModule", function () {
    it("should return the reference to the PoP-Token observable module", function () {
      (PoP.getPopTokenModule() === PoP._popToken).should.be.true;
    });
  });

  describe("#emptyFinalStatementArray", function () {
    it("should completely empty the final statement array", function () {
      for (let i = 0; i < 100; ++i) {
        PoP._finalStatements.array.push(i);
      }

      PoP.emptyFinalStatementArray();

      PoP._finalStatements.array.length.should.equal(0);
    });
  });

  describe("#emptyPopTokenArray", function () {
    it("should completely empty the PoP-Token array", function () {
      for (let i = 0; i < 100; ++i) {
        PoP._popToken.array.push(i);
      }

      PoP.emptyPopTokenArray();

      PoP._popToken.array.length.should.equal(0);
    });
  });

  describe("#addFinalStatement", function () {
    it("should throw an error when finalStatement is not a final statement", function () {
      expect(() => PoP.addFinalStatement("FINAL_STATEMENT", true)).to.throw();
    });

    it("should throw an error when save is not a boolean", function () {
      expect(() => PoP.addFinalStatement(FINAL_STATEMENT, "true")).to.throw();
    });

    it("should not save if save is false", function () {
      return PoP.addFinalStatement(FINAL_STATEMENT, false)
        .then(() => {
          return FileIO.getStringOf(FilesPath.POP_FINAL_STATEMENTS);
        })
        .then(finalStatementsString => {
          finalStatementsString.should.be.empty;
          JSON.stringify(PoP.getFinalStatements().getItem(0)).should.equal(JSON.stringify(FINAL_STATEMENT));
        });
    });

    it("should save if save is true", function () {
      return PoP.addFinalStatement(FINAL_STATEMENT, true)
        .then(() => {
          return FileIO.getStringOf(FilesPath.POP_FINAL_STATEMENTS);
        })
        .then(finalStatementsString => {
          const object = {};
          object.array = [FINAL_STATEMENT];

          JSON.stringify(JSON.parse(finalStatementsString)).should.equal(JSON.stringify(object));
          JSON.stringify(PoP.getFinalStatements().getItem(0)).should.equal(JSON.stringify(FINAL_STATEMENT));
        });
    });
  });

  describe("#addPopToken", function () {
    it("should throw an error when popToken is not a PoP-Token", function () {
      expect(() => PoP.addPopToken("POP_TOKEN", true)).to.throw();
    });

    it("should throw an error when save is not a boolean", function () {
      expect(() => PoP.addPopToken(POP_TOKEN, "true")).to.throw();
    });

    it("should not save if save is false", function () {
      return PoP.addPopToken(POP_TOKEN, false)
        .then(() => {
          return FileIO.getStringOf(FilesPath.POP_TOKEN);
        })
        .then(popTokenString => {
          popTokenString.should.be.empty;
          JSON.stringify(PoP.getPopToken().getItem(0)).should.equal(JSON.stringify(POP_TOKEN));
        });
    });

    it("should save if save is true", function () {
      return PoP.addPopToken(POP_TOKEN, true)
        .then(() => {
          return FileIO.getStringOf(FilesPath.POP_TOKEN);
        })
        .then(popTokenString => {
          const object = {};
          object.array = [POP_TOKEN];

          JSON.stringify(JSON.parse(popTokenString)).should.equal(JSON.stringify(object));
          JSON.stringify(PoP.getPopToken().getItem(0)).should.equal(JSON.stringify(POP_TOKEN));
        });
    });
  });

  describe("#setFinalStatementsArray", function () {
    it("should throw an error when array is not an array", function () {
      expect(() => PoP.setFinalStatementsArray("[FINAL_STATEMENT, FINAL_STATEMENT]", true)).to.throw();
    });

    it("should throw an error when array is empty", function () {
      expect(() => PoP.setFinalStatementsArray([], true)).to.throw();
    });

    it("should throw an error when array is not an array of final statements", function () {
      expect(() => PoP.setFinalStatementsArray([1, 2], true)).to.throw();
    });

    it("should throw an error when save is not a boolean", function () {
      expect(() => PoP.setFinalStatementsArray([FINAL_STATEMENT, FINAL_STATEMENT], "true")).to.throw();
    });

    it("should completely replace the current final statements", function () {
      for (let i = 0; i < 10; ++i) {
        PoP._finalStatements.array.push(i);
      }

      return PoP.setFinalStatementsArray([FINAL_STATEMENT, FINAL_STATEMENT], false)
        .then(() => {
          PoP.getFinalStatements().length.should.equal(2);
        });
    });

    it("should correctly set an array of length 1 and not save", function () {
      return PoP.setFinalStatementsArray([FINAL_STATEMENT], false)
        .then(() => {
          PoP.getFinalStatements().length.should.equal(1);
          JSON.stringify(PoP.getFinalStatements().getItem(0)).should.equal(JSON.stringify(FINAL_STATEMENT));

          return FileIO.getStringOf(FilesPath.POP_FINAL_STATEMENTS);
        })
        .then(finalStatementsString => {
          finalStatementsString.should.be.empty;
        });
    });

    it("should correctly set an array of length 3 and save", function () {
      return PoP.setFinalStatementsArray([FINAL_STATEMENT, FINAL_STATEMENT, FINAL_STATEMENT], true)
        .then(() => {
          PoP.getFinalStatements().length.should.equal(3);
          JSON.stringify(PoP.getFinalStatements().getItem(0)).should.equal(JSON.stringify(FINAL_STATEMENT));
          JSON.stringify(PoP.getFinalStatements().getItem(1)).should.equal(JSON.stringify(FINAL_STATEMENT));
          JSON.stringify(PoP.getFinalStatements().getItem(2)).should.equal(JSON.stringify(FINAL_STATEMENT));

          return FileIO.getStringOf(FilesPath.POP_FINAL_STATEMENTS);
        })
        .then(finalStatementsString => {
          const object = {};
          object.array = [FINAL_STATEMENT, FINAL_STATEMENT, FINAL_STATEMENT];

          JSON.stringify(JSON.parse(finalStatementsString)).should.equal(JSON.stringify(object));
        });
    });
  });

  describe("#setPopTokenArray", function () {
    it("should throw an error when array is not an array", function () {
      expect(() => PoP.setPopTokenArray("[POP_TOKEN, POP_TOKEN]", true)).to.throw();
    });

    it("should throw an error when array is empty", function () {
      expect(() => PoP.setPopTokenArray([], true)).to.throw();
    });

    it("should throw an error when array is not an array of PoP-Token", function () {
      expect(() => PoP.setPopTokenArray([1, 2], true)).to.throw();
    });

    it("should throw an error when save is not a boolean", function () {
      expect(() => PoP.setPopTokenArray([POP_TOKEN, POP_TOKEN], "true")).to.throw();
    });

    it("should completely replace the current PoP-Token", function () {
      for (let i = 0; i < 10; ++i) {
        PoP._popToken.array.push(i);
      }

      return PoP.setPopTokenArray([POP_TOKEN, POP_TOKEN], false)
        .then(() => {
          PoP.getPopToken().length.should.equal(2);
        });
    });

    it("should correctly set an array of length 1 and not save", function () {
      return PoP.setPopTokenArray([POP_TOKEN], false)
        .then(() => {
          PoP.getPopToken().length.should.equal(1);
          JSON.stringify(PoP.getPopToken().getItem(0)).should.equal(JSON.stringify(POP_TOKEN));

          return FileIO.getStringOf(FilesPath.POP_TOKEN);
        })
        .then(popTokenString => {
          popTokenString.should.be.empty;
        });
    });

    it("should correctly set an array of length 3 and save", function () {
      return PoP.setPopTokenArray([POP_TOKEN, POP_TOKEN, POP_TOKEN], true)
        .then(() => {
          PoP.getPopToken().length.should.equal(3);
          JSON.stringify(PoP.getPopToken().getItem(0)).should.equal(JSON.stringify(POP_TOKEN));
          JSON.stringify(PoP.getPopToken().getItem(1)).should.equal(JSON.stringify(POP_TOKEN));
          JSON.stringify(PoP.getPopToken().getItem(2)).should.equal(JSON.stringify(POP_TOKEN));

          return FileIO.getStringOf(FilesPath.POP_TOKEN);
        })
        .then(popTokenString => {
          const object = {};
          object.array = [POP_TOKEN, POP_TOKEN, POP_TOKEN];

          JSON.stringify(JSON.parse(popTokenString)).should.equal(JSON.stringify(object));
        });
    });
  });
});