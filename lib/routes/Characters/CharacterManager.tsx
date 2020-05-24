import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { css, cx } from "emotion";
import React from "react";
import { ContentEditable } from "../../components/ContentEditable/ContentEditable";
import { MagicGridContainer } from "../../components/MagicGridContainer/MagicGridContainer";
import { CharacterDialog } from "./CharacterDialog";
import {
  CharacterType,
  ICharacter,
  useCharacters,
} from "./hooks/useCharacters";

export const CharacterManager: React.FC<{
  onSelection(character: ICharacter): void;
}> = (props) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const charactersManager = useCharacters();
  return (
    <>
      <CharacterDialog
        open={!!charactersManager.state.selectedCharacter}
        character={charactersManager.state.selectedCharacter}
        onSave={(newCharacter) => {
          charactersManager.actions.close();
          charactersManager.actions.update(newCharacter);
        }}
        onDelete={() => {
          const confirmed = confirm(
            "Are you sure you want to delete this character ?"
          );
          if (confirmed) {
            charactersManager.actions.close();
            charactersManager.actions.remove(
              charactersManager.state.selectedCharacter.id
            );
          }
        }}
        onClose={() => {
          charactersManager.actions.close();
        }}
      ></CharacterDialog>

      <Typography variant="h4">{"Characters"}</Typography>
      <Box py="1rem">
        <Grid container spacing={1} justify="center">
          <Grid item>
            <Button
              onClick={() => {
                charactersManager.actions.add(CharacterType.CoreCondensed);
              }}
              variant="contained"
              color="secondary"
              endIcon={<PersonAddIcon></PersonAddIcon>}
            >
              {"Add Core Character"}
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => {
                charactersManager.actions.add(CharacterType.Accelerated);
              }}
              variant="contained"
              color="secondary"
              endIcon={<PersonAddIcon></PersonAddIcon>}
            >
              {"Add Accelerated Character"}
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => {
                charactersManager.actions.add(CharacterType.Blank);
              }}
              variant="text"
              color="secondary"
              endIcon={<PersonAddIcon></PersonAddIcon>}
            >
              {"Add Blank Character"}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box py="1rem">
        <MagicGridContainer items={charactersManager.state.characters.length}>
          {charactersManager.state.characters.map((character) => {
            return renderCharacterCard(character);
          })}
        </MagicGridContainer>
      </Box>
    </>
  );

  function renderCharacterCard(character: ICharacter) {
    const [firstAspect] = character.aspects;
    return (
      <Box
        key={character.id}
        className={cx(
          css({
            width: isSmall ? "100%" : "25%",
            padding: "0 .5rem 1.5rem .5rem",
          })
        )}
      >
        <Paper
          elevation={undefined}
          onClick={() => {
            if (props.onSelection) {
              props.onSelection(character);
            } else {
              charactersManager.actions.select(character);
            }
          }}
          className={css({
            "cursor": "pointer",
            "&:hover": {
              background: theme.palette.action.hover,
            },
          })}
        >
          <Box>
            <Box
              className={css({
                fontSize: "1.5rem",
                width: "100%",
                padding: "0.5rem 0",
                borderBottom: "1px solid #f0a4a4",
              })}
            >
              <Box
                p={"1rem 1rem 1rem 1rem"}
                display="flex"
                justifyContent="center"
              >
                <ContentEditable
                  value={character.name}
                  readonly
                ></ContentEditable>
              </Box>
            </Box>
            <Box
              className={css({
                fontSize: "1.1rem",
                lineHeight: "1.7rem",
                padding: "0.5rem 0",
                width: "100%",
                borderBottom: `1px solid ${theme.palette.divider}`,
              })}
            >
              <Box p="0 1rem" display="flex" justifyContent="center">
                <Typography>
                  <i>{firstAspect?.value || "..."}</i>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    );
  }
};

CharacterManager.displayName = "CharacterManager";