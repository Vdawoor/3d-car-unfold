from pydantic import BaseModel, Field
from typing import List


class GuideRequest(BaseModel):
    query: str


class GuideResponse(BaseModel):
    message: str = Field(
        description="A conversational 2-3 sentence explanation about the car component that includes specific numeric specs (measurements, capacities, power figures, prices, ratings) whenever relevant."
    )
    cameraPosition: List[float] = Field(
        description="[x, y, z] coordinates where the camera should be placed for the best view of the component."
    )
    lookAt: List[float] = Field(
        description="[x, y, z] coordinates of the point the camera should look at (the component location)."
    )
    highlightPosition: List[float] = Field(
        description="[x, y, z] coordinates where the highlight marker should appear on the 3D model."
    )
    category: str = Field(
        description="The spec category to activate in the sidebar. Must be one of: general, engine, transmission, fuel, dimensions, suspension, safety, interior, exterior, pricing."
    )
