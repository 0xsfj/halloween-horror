import Head from 'next/head';
// import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Flex, Spacer, Button, Icon, Text, SimpleGrid, Box, Image, Badge, Stack, Progress, useToast, Container } from '@chakra-ui/react';
import { ethers } from 'ethers';
import halloweenHorrorAbi from '../artifacts/contracts/HalloweenHorror.sol/HalloweenHorror.json';

const HalloweenHorror = (props) => {
  return (
    <Icon viewBox="0 0 1234 156" color="red.500" {...props}>
      <path
        d="M49.2 72.358V51.667c0-18.126 1.71-25.137 3.078-27.702l4.446 1.368v40.869L49.2 72.358zM78.097.71C75.363 7.72 67.155 8.404 62.88 8.233c-3.868-.158-9.52-1.044-15.276-1.852l-1.44-.2c-6.241-.855-12.44-1.539-16.458-1.026C-12.018 9.772 2.688 60.559 2.688 60.559.294 41.92 4.056 30.292 12.264 24.991c12.14-7.695 32.319-2.736 32.319-2.736-9.063 1.539-13.338 9.576-13.338 32.319v7.182c-9.063-1.368-16.93 1.368-19.836 6.498-2.907 5.13-2.052 11.286-2.052 11.286 3.59-6.156 13.68-3.762 21.888-1.368l.17 22.743v1.197c-.167 19.104-9.367 19.815-9.735 19.835l-.011.001c14.193 4.788 27.53-.171 27.53-22.743V75.436l7.525-5.985v72.333s-25.48-17.271-44.631-12.312C2.175 132.208.123 144.007.123 144.007c9.747-13.509 42.579 10.26 42.579 10.26 3.078 2.052 7.695 2.052 10.602-.342l7.182-6.669V66.202l3.42-3.078c2.565-1.881 6.669-4.446 11.457-1.026l13.167 9.063v53.694c0 4.275-.513 29.583-11.8 22.743 0 0 .856 8.037 14.536 8.037 9.234 0 15.219-9.234 15.219-31.464V74.41c7.695-3.42 11.799-12.312 11.799-12.312-4.617 3.42-12.312-1.539-12.825-1.881l-18.81-12.312c-3.078-2.052-7.353-1.881-10.26.513L63.906 60.046l-3.42 2.907V26.188c8.72 2.223 15.56-1.026 18.297-5.814 5.793-9.703 1.16-17.199-.29-19.162l-.1-.132a9.433 9.433 0 00-.243-.308L78.115.73l-.01-.013-.008-.007zM179.341 124l11.628-14.364s.17 0 .17-.171c0 0-.683-2.052-5.642-3.762l-.171-20.178V66.373c7.866-3.249 11.97-12.141 11.97-12.141-4.788 3.249-12.312-1.539-12.825-1.881l-18.81-12.483c-3.25-2.052-7.353-1.881-10.431.513l-7.695 6.327-22.743 16.416-.171 30.096v16.074c.513.342.855.513 1.026.684l18.639 12.312c3.249 2.052 7.353 1.881 10.43-.513l7.696-6.327 1.197-.855c3.078.171 10.089 1.197 15.732 9.405zm-23.598-15.561l-13.167-9.405.17-45.657c2.908-1.368 7.012-2.394 11.629.342l12.996 9.405v45.657s-.171.171-.342.171c-2.907 1.368-7.011 2.052-11.286-.513zM220.903 124l11.8-14.364s.17 0 .17-.171l-.004-.01c-.074-.16-1.057-2.113-5.81-3.752V12.679L213.723 4.3l-9.405 15.903 4.788 3.42v85.158c-2.223 1.539-5.472 5.985-5.472 5.985s.5-.086 1.358-.096h.243c3.103.017 10.117 1.066 15.67 9.33zm35.579 0l11.799-14.364s.17 0 .17-.171c0 0-.854-2.052-5.813-3.762V12.679L249.3 4.3l-9.405 15.903 4.788 3.42v85.158c-2.223 1.539-5.472 5.985-5.472 5.985s.5-.086 1.358-.096h.243c3.103.017 10.117 1.066 15.67 9.33zm56.098-1.368l30.096-27.531v-29.07c7.695-3.42 11.799-12.312 11.799-12.312-4.617 3.42-12.312-1.539-12.825-1.881l-18.81-12.312c-3.078-2.052-7.695-2.052-10.602.342l-30.096 27.531v29.07c-7.462 3.316-11.547 11.778-11.788 12.288l-.011.024c3.693-2.736 9.357-.11 11.737 1.226l.26.148c.448.259.74.45.828.507l18.81 12.312c3.078 2.052 7.695 2.052 10.602-.342zm.684-13.68l-13.167-9.234V54.232c2.565-2.052 6.669-3.933 11.457-.684l13.167 9.234v45.486c-2.565 2.052-6.67 3.933-11.457.684zM467.003 124l11.628-15.048-4.788-3.42V53.719c2.394-1.539 5.472-5.985 5.472-5.985s-.5.086-1.358.096h-.243c-3.103-.017-10.118-1.066-15.67-9.33l-11.628 14.364-.018.018-.135.135-.018.018s.684 2.052 5.643 3.762v51.129c-2.394 1.881-6.498 3.762-11.457.513l-12.996-9.063V53.719c2.223-1.539 5.472-5.985 5.472-5.985s-.5.086-1.358.096h-.243c-3.103-.017-10.118-1.066-15.67-9.33l-11.8 14.364-.017.018-.135.135-.018.018s.855 2.052 5.814 3.762v52.326c-2.907 1.368-7.182 2.223-11.628-.342l-13.167-9.405V53.719c2.223-1.539 5.472-5.985 5.472-5.985s-.5.086-1.358.096h-.243c-3.103-.017-10.118-1.066-15.67-9.33l-11.8 14.364-.017.018-.135.135-.018.018s.855 2.052 5.814 3.762v39.33c-7.628 3.15-11.718 11.607-11.959 12.117l-.011.024c4.788-3.249 12.483 1.539 12.996 1.881l18.81 12.312c3.078 2.223 7.353 1.881 10.26-.513l9.918-8.037 4.446-3.249 17.955 11.799c3.249 2.223 7.353 1.881 10.43-.513l12.313-11.628v5.472L467.003 124zm48.745-1.881l7.695-6.327 19.323-13.851v-2.394l-15.048 8.721c-2.907 1.368-7.182 2.394-11.8-.342l-12.14-8.55v-5.985l34.37-27.36c9.919-1.197 15.049-14.022 15.049-14.022-4.617 7.353-20.862-7.353-26.505-11.97-2.907-2.394-7.353-1.881-10.26.513l-7.866 6.327-22.914 16.416v46.341c.513.342.855.513 1.026.513l18.81 12.483c3.078 2.052 7.353 1.881 10.26-.513zm-11.97-34.542V53.548c2.907-1.368 7.01-2.736 11.628.342l2.094 1.496.714.51c1.08.77 2.354 1.682 3.634 2.596l.59.421 6.135 4.382c2.223 1.368 1.539 1.368 3.42 1.71l-28.215 22.572zm84.142 34.542l7.695-6.327 19.323-13.851v-2.394l-15.048 8.721c-2.907 1.368-7.182 2.394-11.8-.342l-12.14-8.55v-5.985l34.37-27.36c9.919-1.197 15.049-14.022 15.049-14.022-4.617 7.353-20.862-7.353-26.505-11.97-2.907-2.394-7.353-1.881-10.26.513l-7.866 6.327-22.914 16.416v46.341c.513.342.855.513 1.026.513l18.81 12.483c3.078 2.052 7.353 1.881 10.26-.513zm-11.97-34.542V53.548c2.907-1.368 7.01-2.736 11.628.342l2.094 1.496.714.51c1.08.77 2.355 1.682 3.634 2.596l.59.421 6.135 4.382c2.223 1.368 1.539 1.368 3.42 1.71L575.95 87.577zM689.846 124l11.97-14.364s.171 0 .171-.171c0 0-1.026-2.052-5.985-3.762v-39.33c7.866-3.249 11.97-12.312 11.97-12.312-4.788 3.42-12.312-1.368-12.996-1.881l-18.81-12.312c-3.078-2.052-7.182-1.881-10.26.513L653.423 52.18v-5.472l-11.457-7.524-11.115 14.364 4.617 3.42.171 51.813c-2.283 1.467-5.343 5.578-5.622 5.957l-.021.028s.5-.086 1.36-.096h.244c3.11.017 10.157 1.066 15.838 9.33l11.628-14.364s.171 0 .171-.171c0 0-.684-2.052-5.643-3.762V54.574c2.394-1.881 6.498-3.933 11.457-.513l12.996 9.063v45.657c-2.12 1.467-5.172 5.578-5.451 5.957l-.021.028s.5-.086 1.358-.096h.243c3.103.017 10.118 1.066 15.67 9.33zm126.218-51.642V51.667c0-18.126 1.71-25.137 3.078-27.702l4.446 1.368v40.869l-7.524 6.156zM844.962.711c-2.735 7.009-10.943 7.693-15.218 7.522-8.379-.342-25.137-4.104-33.174-3.078-41.724 4.617-27.018 55.404-27.018 55.404-2.394-18.639 1.368-30.267 9.576-35.568 12.141-7.695 32.32-2.736 32.32-2.736-9.064 1.539-13.339 9.576-13.339 32.319v7.182c-9.063-1.368-16.929 1.368-19.836 6.498s-2.052 11.286-2.052 11.286c3.213-5.508 11.628-4.171 19.243-2.114l.67.183c.667.185 1.327.374 1.975.563l.171 22.743v1.197c-.167 19.104-9.368 19.815-9.736 19.835l-.01.001c14.192 4.788 27.53-.171 27.53-22.743V75.436l7.524-5.985v72.333s-25.479-17.271-44.63-12.312c-9.919 2.736-11.97 14.535-11.97 14.535 9.746-13.509 42.578 10.26 42.578 10.26 3.078 2.052 7.695 2.052 10.602-.342l7.182-6.669V66.202l3.42-3.078c2.565-1.881 6.67-4.446 11.457-1.026l13.167 9.063v53.694c0 4.275-.513 29.583-11.799 22.743 0 0 .855 8.037 14.535 8.037 9.234 0 15.22-9.234 15.22-31.464V74.41c7.694-3.42 11.798-12.312 11.798-12.312-4.617 3.42-12.312-1.539-12.825-1.881l-18.81-12.312c-3.078-2.052-7.353-1.881-10.26.513L830.77 60.046l-3.42 2.907V26.188c8.721 2.223 15.561-1.026 18.297-5.814 5.793-9.703 1.16-17.199-.29-19.162l-.099-.132c-.155-.205-.26-.327-.29-.363l-.006-.006zm84.314 121.921l30.096-27.531v-29.07c7.695-3.42 11.8-12.312 11.8-12.312-4.618 3.42-12.313-1.539-12.826-1.881l-18.81-12.312c-3.078-2.052-7.695-2.052-10.602.342l-30.096 27.531v29.07c-7.695 3.42-11.799 12.312-11.799 12.312 4.617-3.42 12.312 1.539 12.825 1.881l18.81 12.312c3.078 2.052 7.695 2.052 10.602-.342zm.684-13.68l-13.167-9.234V54.232c2.565-2.052 6.67-3.933 11.457-.684l13.167 9.234v45.486c-2.565 2.052-6.669 3.933-11.457.684zM991.872 124l11.115-14.535.171-.171s-.684-2.052-5.472-3.933V54.916c2.394-2.052 6.327-3.933 10.944-.684 2.565 1.881 4.617 3.591 7.182 4.104-10.487 10.148-11.437 20.297-11.456 22.171v.23c0 2.394 1.88 4.446 4.274 4.446s4.446-2.052 4.446-4.446c0-2.394-2.052-4.446-4.446-4.446-.513 0-1.026.171-1.368.342 2.687-8.565 11.807-16.636 18.288-21.62l.351-.269v-.17l7.182-4.788-13.85-9.747c-2.908-2.223-6.84-2.052-9.748.513l-11.799 11.799v-5.472l-10.944-7.695-10.602 14.535 4.446 3.591.171 51.129c-2.223 1.71-5.3 6.156-5.3 6.156s.473-.086 1.288-.094h.23c2.944.026 9.603 1.106 14.897 9.499zm58.15 0l11.115-14.535.171-.171s-.684-2.052-5.472-3.933V54.916c2.394-2.052 6.327-3.933 10.944-.684 2.565 1.881 4.617 3.591 7.182 4.104-10.486 10.148-11.437 20.297-11.456 22.171v.23c0 2.394 1.88 4.446 4.274 4.446s4.446-2.052 4.446-4.446c0-2.394-2.052-4.446-4.446-4.446-.513 0-1.026.171-1.368.342 2.687-8.565 11.808-16.636 18.288-21.62l.351-.269v-.17l7.182-4.788-13.85-9.747c-2.908-2.223-6.84-2.052-9.748.513l-11.799 11.799v-5.472l-10.944-7.695-10.602 14.535 4.446 3.591.171 51.129c-2.223 1.71-5.3 6.156-5.3 6.156s.473-.086 1.288-.094h.23c2.944.026 9.603 1.106 14.897 9.499zm79.525-1.368l30.096-27.531v-29.07c7.695-3.42 11.8-12.312 11.8-12.312-3.694 2.736-9.358.11-11.738-1.226l-.26-.148c-.448-.259-.74-.45-.828-.507l-18.81-12.312c-3.078-2.052-7.695-2.052-10.602.342l-30.096 27.531v29.07c-7.695 3.42-11.799 12.312-11.799 12.312 4.617-3.42 12.312 1.539 12.825 1.881l18.81 12.312c3.078 2.052 7.695 2.052 10.602-.342zm.684-13.68l-13.167-9.234V54.232c2.565-2.052 6.67-3.933 11.457-.684l13.167 9.234v45.486c-2.565 2.052-6.669 3.933-11.457.684zM1192.143 124l11.115-14.535.171-.171s-.684-2.052-5.472-3.933V54.916c2.394-2.052 6.327-3.933 10.944-.684 2.565 1.881 4.617 3.591 7.182 4.104-10.486 10.148-11.437 20.297-11.456 22.171v.23c0 2.394 1.88 4.446 4.274 4.446s4.446-2.052 4.446-4.446c0-2.394-2.052-4.446-4.446-4.446-.513 0-1.026.171-1.368.342 2.688-8.565 11.808-16.636 18.289-21.62l.35-.269v-.17l7.182-4.788-13.85-9.747c-2.908-2.223-6.84-2.052-9.748.513l-11.799 11.799v-5.472l-10.944-7.695-10.602 14.535 4.446 3.591.171 51.129c-2.223 1.71-5.3 6.156-5.3 6.156s.473-.086 1.288-.094h.23c2.944.026 9.603 1.106 14.897 9.499z"
        fill="#EB4727"
        fillRule="nonzero"
      />
    </Icon>
  );
};

const Home = () => {
  const toast = useToast();
  const [currentAccount, setCurrentAccount] = useState(null);
  const [characterNFT, setCharacterNFT] = useState(null);

  const [correctChain, setCorrectChain] = useState(false);

  const [attackInfo, setAttackInfo] = useState('');

  const CONTRACT_ADDRESS = '0x8737012360C3e571e3346296291B4b8F2EE80e36';

  const transformCharacterData = (characterData) => {
    return {
      name: characterData.name,
      imageURI: characterData.imageURI,
      health: characterData.health.toNumber(),
      maxHealth: characterData.maxHealth.toNumber(),
      attackDamage: characterData.attackDamage.toNumber(),
    };
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();
      console.log({ chainId });

      if (chainId !== 4) {
        toast({
          title: 'Wrong Network',
          description: 'Please switch to the Rinkeby test network',
          status: 'error',
          isClosable: true,
        });
        setCorrectChain(false);
      } else {
        setCorrectChain(true);
        if (!ethereum) {
          toast({
            title: 'Account created.',
            description: 'Make sure you have a wallet installed',
            status: 'warning',
            isClosable: true,
          });

          console.log('Make sure you have a wallet installed');
        } else {
          toast({
            title: 'Wallet is Connected',
            description: 'You can now interact with the contract',
            status: 'success',
            isClosable: true,
          });
          console.log('Wallet is installed', ethereum);
        }

        const accounts = await ethereum.request({ method: 'eth_accounts' });
        console.log('Accounts', accounts);

        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log(`Found authorised account: ${account}`);
          setCurrentAccount(account);
        } else {
          console.log('No accounts found');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        // Add in chakra ui alert
        console.log('Make sure you have a wallet installed');
        return;
      }

      // Request access to the user's accounts
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      console.log('Requested accounts', accounts);
      console.log(`Setting Currrent account to ${accounts[0]}`);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const ConnectWallet = () => {
    return (
      <>
        <Text textAlign="center">Connect your wallet to mint a trusty college student that will just try to survive halloween night in the woods!</Text>
        <Text>Currently only on on Rinkeby Testnet</Text>
        <Button onClick={connectWallet}>Connect Wallet</Button>
      </>
    );
  };

  const SelectCharacter = () => {
    const [characters, setCharacters] = useState([]);
    const [gameContract, setGameContract] = useState(null);

    useEffect(() => {
      const { ethereum } = window;
      console.log(ethereum);
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const gameContract = new ethers.Contract(CONTRACT_ADDRESS, halloweenHorrorAbi.abi, signer);

        setGameContract(gameContract);
      } else {
        console.log('No ethereum object found');
      }
    }, []);

    useEffect(() => {
      // Get all characters
      const getCharacters = async () => {
        try {
          console.log('Getting characters');
          const charactersTxn = await gameContract.getAllCharacters();

          const characters = charactersTxn.map((characterData) => {
            return transformCharacterData(characterData);
          });

          setCharacters(characters);
        } catch (error) {
          console.log(`Something went wrong fetching all characters`);
          console.log(error);
        }
      };
      const onCharacterMint = async (sender, tokenId, characterIndex) => {
        console.log(`College Student Minted - Sender: ${sender}, tokenId: ${tokenId.toNumber()}, Character Index: ${characterIndex.toNumber()} `);
        if (gameContract) {
          const characterNft = await gameContract.checkIfUserHasNFT();
          console.log('Character NFT', characterNft);
          console.log(`https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`);
          setCharacterNFT(transformCharacterData(characterNft));
        }
      };

      if (gameContract) {
        getCharacters();
        gameContract.on('CharacterNFTMinted', onCharacterMint);
      }

      return () => {
        if (gameContract) {
          gameContract.off('CharacterNFTMinted', onCharacterMint);
        }
      };
    }, [gameContract]);

    console.log(characters);

    const mintCharacterNFTAction = async (nftId) => {
      console.log(`Minting character: ${nftId} `);
      try {
        if (gameContract) {
          const mintTxn = await gameContract.mintCharacter(nftId);
          await mintTxn.wait();
          console.log('Minted character', mintTxn);
        }
      } catch (error) {
        console.log(`Something went wrong minting character`);
        console.log(error);
      }
    };

    return (
      <Container>
        <>
          <Text>Select your College Student that will be deep in the woods halloween night: {currentAccount.substring(0, 5)}...</Text>
          <SimpleGrid columns={3} spacing={4} mt="8">
            {characters.map((character, index) => {
              return (
                <Box key={index}>
                  <Image src={character.imageURI} alt={character.name} mb="4" />
                  <Text textAlign="center">{character.name}</Text>
                  <Stack direction="row">
                    <Badge variant="outline" colorScheme="red">
                      Attack Damage: {character.attackDamage}
                    </Badge>
                    <Badge variant="outline" colorScheme="green">
                      Max Health: {character.maxHealth}
                    </Badge>
                  </Stack>

                  <Button onClick={() => mintCharacterNFTAction(index)}>Mint {character.name}</Button>
                </Box>
              );
            })}
          </SimpleGrid>
        </>
      </Container>
    );
  };

  const Arena = () => {
    const [gameContract, setGameContract] = useState(null);
    const [horror, setHorror] = useState(null);

    useEffect(() => {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const gameContract = new ethers.Contract(CONTRACT_ADDRESS, halloweenHorrorAbi.abi, signer);

        setGameContract(gameContract);
      } else {
        console.log('No ethereum object found');
      }
    }, []);

    useEffect(() => {
      const getHorror = async () => {
        const horrorTxn = await gameContract.getHorror();
        console.log('Horror', horrorTxn);
        setHorror(transformCharacterData(horrorTxn));
      };

      const onAttackComplete = async (newHorrorsHealth, newPlayerHealth) => {
        const horrorHealth = newHorrorsHealth.toNumber();
        const playerHealth = newPlayerHealth.toNumber();

        console.log(`Horror Health: ${horrorHealth} Player Health: ${playerHealth}`);

        setHorror((prevState) => {
          return { ...prevState, health: horrorHealth };
        });

        setCharacterNFT((prevState) => {
          return { ...prevState, health: playerHealth };
        });
      };

      if (gameContract) {
        getHorror();
        gameContract.on('AttackComplete', onAttackComplete);
      }

      return () => {
        if (gameContract) {
          gameContract.off('AttackComplete', onAttackComplete);
        }
      };
    }, [gameContract]);

    const attackAction = async () => {
      console.log('Attacking');

      try {
        if (gameContract) {
          setAttackInfo('Attacking');
          const attackTxn = await gameContract.attackHorror();
          await attackTxn.wait();
          console.log('Attacked', attackTxn);
          setAttackInfo('Attacked and Hit');
        }
      } catch (error) {
        console.log(`Something went wrong attacking`);
        console.log(error);
        setAttackInfo('');
      }
    };

    console.log({ horror });
    console.log({ characterNFT });

    if (!horror) {
      return <Text>Loading...</Text>;
    }

    return (
      <>
        <Container>
          <Text>Arena</Text>
          <Text>{attackInfo}</Text>
          <SimpleGrid columns={2} spacing={4} mt="8">
            <Box w="100%">
              <Text>Horror</Text>
              <Image src={horror.imageURI} alt={horror.name} />
              <Text>{horror.name}</Text>

              <Progress value={horror.health} max={horror.maxHealth} min={0} colorScheme="green" />
              <Button onClick={() => attackAction()}>Attack</Button>
              <Text>College Student</Text>
            </Box>
            <Box w="100%">
              <Text>College Student</Text>
              <Image src={characterNFT.imageURI} alt={characterNFT.name} />
              <Text>{characterNFT.name}</Text>

              <Progress value={characterNFT.health} max={characterNFT.maxHealth} min={0} colorScheme="green" />
            </Box>
          </SimpleGrid>
        </Container>
      </>
    );
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    const fetchNFTMetadata = async () => {
      console.log(`Checking for Character NFT on address: ${currentAccount}`);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const gameContract = new ethers.Contract(CONTRACT_ADDRESS, halloweenHorrorAbi.abi, signer);

      const txn = await gameContract.checkIfUserHasNFT();
      if (txn.name) {
        console.log(`User has NFT`);
        setCharacterNFT(transformCharacterData(txn));
      } else {
        console.log(`Account ${currentAccount} does not have a Halloween Horror College Student NFT`);
      }
    };

    if (currentAccount) {
      console.log(`Current Account: ${currentAccount}`);
      fetchNFTMetadata();
    }
  }, [currentAccount]);

  return (
    <>
      <Head>
        <title>Halloween Horror</title>
        <meta name="description" content="Your trusty college student that is just trying to survive halloween night in the woods!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex as="main" flexDirection="column" justifyContent="center" alignItems="center" minH="100vh" p="10">
        <HalloweenHorror w="50vw" h="100%" mb="8" />
        {correctChain ? (
          <>
            {currentAccount === null ? <ConnectWallet /> : null}
            {currentAccount === null ? null : <SelectCharacter />}
            {characterNFT === null ? null : <Arena />}
          </>
        ) : (
          <Text>Please switch to Rinkeby to play this game</Text>
        )}
      </Flex>
    </>
  );
};

export default Home;
