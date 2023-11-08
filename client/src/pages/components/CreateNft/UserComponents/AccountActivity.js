import React, { useState } from 'react';

import {
  BorderedCardBody,
  CustomCard,
  FlexCardBody,
  CardTitle4,
  CardTitle6,
} from '../../StyledComponents/Cards';

import {
  ActivityBox,
  RecentImageBox,
  Scrollable,
} from '../../StyledComponents/Boxs';

export function AccountActivity({ user }) {
  const images = user?.image_archive;
  const nfts = user?.nft_archive;

  return (
    <>
      <CardTitle4 $color="grey">Account Activity</CardTitle4>
      <BorderedCardBody>
        <FlexCardBody $padding="5px" $margin="10px">
          <ActivityBox
            title="Images Generated"
            content={user?.images_generated}
          />
          <ActivityBox title="NFTs Minted" content={user?.nfts_minted} />
        </FlexCardBody>
        <CardTitle6>Recent Images</CardTitle6>
        <CustomCard $padding="5px" $margin="10px" $border $borderRadius="3px">
          <Scrollable
            $flex
            $flexWrap="wrap"
            $justifyContent="space-evenly"
            $height="195px"
          >
            {images &&
              images
                .slice()
                .reverse()
                .map((image) => <RecentImageBox link={image.image} />)}
          </Scrollable>
        </CustomCard>
        <CardTitle6>Recently Minted</CardTitle6>
        <CustomCard $padding="5px" $margin="10px" $border $borderRadius="3px">
          <Scrollable
            $flex
            $flexWrap="wrap"
            $justifyContent="space-evenly"
            $height="195px"
          >
            {nfts &&
              nfts
                .slice()
                .reverse()
                .map((nft) => <RecentImageBox link={nft.image} />)}
          </Scrollable>
        </CustomCard>
      </BorderedCardBody>
    </>
  );
}
