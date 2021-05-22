export const guestItemTemplate = `
    <li class="guestsItem positive" data-id="{{id}}">
        <div class="guestsItem-avatar-button">
            <span class="avatar"><span>{{guestInitial}}</span></span>
            <button type="button" class="btn btn-outline-danger btn-remove-guest"><i class="bi bi-x" style="font-size: 1.8rem;"></i></button>
        </div>
        <div class="guestsItem-info">
            <h6 class="guestsItem-info_name">{{name}}</h6>
            <p class="guestsItem-info_content"><small>{{debtText}}</small></p>
        </div>
        <span class="guestItem-badge">{{debt}} €</span>
    </li>
`;

export const guestListTemplate = `
    {{#each guests}}
        {{> guestRow
            id=id
            name=name
            debtText=debtText
            debt=debt
        }}
    {{/each}}
`;

export const productItemTemplate = `
    <li class="productItem" data-id="{{id}}" data-userid="{{buyer}}">
        <h6 class="productItem-title">{{title}}</h6>
        <span class="productItem-badge">{{buyerName}}</span>
        <h6 class="productItem-price">{{displayPrice}} €</h6>
        <div class="deleteProduct">
            <button type="button" class="btn btn-danger btn-sm btn-deleteProduct">Eliminar</button>
        </div>
    </li>
`;

export const productListTemplate = `
    {{#each products}}
        {{> productRow
            id=id
            title=title
            buyerName=buyerName
            price=price
        }}
    {{/each}}
`;

export const buyerOption = `
    <option value="{{id}}">
        {{name}}
    </option>
`;

export const buyerOptions = `
    {{#each guests}}
        {{> buyerOption
            id=id
            name=name
        }}
    {{/each}}
`;