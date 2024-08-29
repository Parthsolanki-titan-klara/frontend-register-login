import react from "react";
import { alpha, Box } from "@mui/material";

export function UnAuthorized() {
    return (
        <>
            <Box
                id="image"
                sx={(theme) => ({
                    mt: { xs: 8, sm: 10 },
                    alignSelf: 'center',
                    height: { xs: 200, sm: 700 },
                    width: '100%',
                    backgroundImage:
                        theme.palette.mode === 'light'
                            ? 'url("/assets/error_401.jpg")'
                            : 'url("/assets/error_401.jpg")',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    outlineColor:
                        theme.palette.mode === 'light'
                            ? alpha('#BFCCD9', 0.5)
                            : alpha('#9CCCFC', 0.1),
                })}
            />
        </>
    );
}