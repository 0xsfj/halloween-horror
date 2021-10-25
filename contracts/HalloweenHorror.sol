//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

// NFT contract
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Helper functions
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./libraries/Base64.sol";

import "hardhat/console.sol";

contract HalloweenHorror is ERC721 {
    struct CharacterAttributes {
        uint256 characterId;
        string name;
        string imageURI;
        uint256 health;
        uint256 maxHealth;
        uint256 attackDamage;
    }

    // Token Ids
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    CharacterAttributes[] characters;

    // Create a mapping from the nft's tokenId to the character's attributes
    mapping(uint256 => CharacterAttributes) public nftHolderAttributes;

    // Map the address to the NFT's tokenId
    mapping(address => uint256) public nftHolders;

    constructor(
        string[] memory characterNames,
        string[] memory characterImageURIs,
        uint256[] memory characterHealth,
        uint256[] memory characterAttackDamage
    ) ERC721("Halloween Horror College Students", "College Student") {
        for (uint256 i = 0; i < characterNames.length; i += 1) {
            characters.push(
                CharacterAttributes({
                    characterId: i,
                    name: characterNames[i],
                    imageURI: characterImageURIs[i],
                    health: characterHealth[i],
                    maxHealth: characterHealth[i],
                    attackDamage: characterAttackDamage[i]
                })
            );

            CharacterAttributes memory c = characters[i];
            console.log(
                "Done initalizing %s with Health %s, img %s",
                c.name,
                c.health,
                c.imageURI
            );
        }
        _tokenIds.increment();
    }

    // Users run mintCharacter to mint character
    function mintCharacter(uint256 _characterId) external {
        // Get current tokenId
        uint256 newItemId = _tokenIds.current();

        // Assign the tokenId to the wallet address
        _safeMint(msg.sender, newItemId);

        // Map the tokenId to the character's attributes
        nftHolderAttributes[newItemId] = CharacterAttributes({
            characterId: _characterId,
            name: characters[_characterId].name,
            imageURI: characters[_characterId].imageURI,
            health: characters[_characterId].health,
            maxHealth: characters[_characterId].health,
            attackDamage: characters[_characterId].attackDamage
        });

        console.log(
            "Minted NFT with id %s and characterId %s",
            newItemId,
            _characterId
        );

        nftHolders[msg.sender] = newItemId;

        _tokenIds.increment();
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        CharacterAttributes memory charAttributes = nftHolderAttributes[
            _tokenId
        ];

        string memory strHealth = Strings.toString(charAttributes.health);
        string memory strMaxHealth = Strings.toString(charAttributes.maxHealth);
        string memory strAttackDamage = Strings.toString(
            charAttributes.attackDamage
        );

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        charAttributes.name,
                        '", "description": "Your trusty college student that is just trying to survive halloween night in the woods!", "image": "',
                        charAttributes.imageURI,
                        '", "attributes": [ { "trait_type": "Health Points", "value": ',
                        strHealth,
                        ', "max_value":',
                        strMaxHealth,
                        '}, { "trait_type": "Attack Damage", "value": ',
                        strAttackDamage,
                        "} ]}"
                    )
                )
            )
        );

        string memory output = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        return output;
    }
}
